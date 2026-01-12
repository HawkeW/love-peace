import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function toDataUri(filePath: string) {
  const buf = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mime =
    ext === '.png'
      ? 'image/png'
      : ext === '.webp'
        ? 'image/webp'
        : 'image/jpeg'
  return `data:${mime};base64,${buf.toString('base64')}`
}

function listImages(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => path.join(dir, f))
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('请在环境变量中设置 OPENAI_API_KEY')
    process.exit(1)
  }

  const model = new ChatOpenAI({
    model: 'zai-org/GLM-4.5V',
    temperature: 0.5
  })

  const weddingDir = path.resolve('public/gallery/wedding')
  const descDir = path.resolve('public/descs')
  ensureDir(descDir)

  const images = listImages(weddingDir)
  for (const imgPath of images) {
    const base = path.basename(imgPath).replace(/\.(jpe?g|png|webp)$/i, '')
    const outPath = path.join(descDir, `${base}.md`)
    if (fs.existsSync(outPath)) continue
    const dataUri = toDataUri(imgPath)

    const sys = new SystemMessage(
      '你是婚纱摄影图片描述助手，使用简体中文，客观准确，不猜测人物身份或姓名。输出结构包含：标题、人物、服装配饰、姿态与互动、场景与背景、光线与氛围、色彩与风格、构图与细节、情绪与故事。字数约200-300字。'
    )
    const user = new HumanMessage({
      content: [
        { type: 'text', text: '请根据图片生成详细描述，遵循上面的结构。' },
        { type: 'image_url', image_url: { url: dataUri } }
      ]
    })

    const ai = await model.invoke([sys, user])
    const text =
      typeof ai.content === 'string'
        ? ai.content
        : Array.isArray(ai.content)
          ? ai.content
            .filter((c: any) => c.type === 'text')
            .map((c: any) => c.text)
            .join('\n')
          : String(ai.content)

    fs.writeFileSync(outPath, text.trim() + '\n', 'utf8')
    console.log(`生成完成: ${outPath}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
