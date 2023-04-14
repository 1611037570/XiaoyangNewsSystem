import { useEdtiorStore } from "@/stores/editor"
<<<<<<< HEAD

/**
 * 将文件转换为经过压缩和等比裁切的 base64 图片
 * @param file 待转换的图片文件
 * @returns 经过压缩和等比裁切后的 base64 图片
 */
export const innerImg = async (file: Blob) => {
  if (!validateFile(file)) return // 检查文件是否符合要求
  let image = await transformImage(file) // 获取文件对应的图片
  image = compressImage(image) // 进行等比裁切操作
  image = base64Image(image) // 将裁切后的图片转换为 base64 格式
  return image
}
/**
 * 验证文件是否合法，文件大小不超过10MB，扩展名为.jpg、.jpeg或.png
 * @param file 待验证的文件
 * @returns 如果文件合法返回true，否则返回false
 */
const validateFile = (file: any) => {
  const sizeLimit = 10 * 1024 * 1024 // 设置文件大小上限为10MB
  const legalExts = [".jpg", ".jpeg", ".png"] // 合法文件扩展名数组
  if (file.size > sizeLimit) {
    // 如果文件大小超过上限，提示错误并返回false
    ElMessage.error("文件过大")
    return false
  }
  const name = file.name.toLowerCase() // 获取文件名并转换为小写
  if (!legalExts.some((ext) => name.endsWith(ext))) {
    // 如果文件扩展名不合法，提示错误并返回false
    ElMessage.error("文件类型错误")
    return false
  }
  return true // 文件合法，返回true
}

/**
 * 转换图片文件为图片对象并获取图片宽度和高度
 * @param file 待转换的图片文件
 * @returns 包含图片对象、宽度和高度的Promise对象
 */
export const transformImage = (file: Blob) => {
  return new Promise(function (resolve) {
    const oFReader = new FileReader() // 创建FileReader对象
    oFReader.readAsDataURL(file) // 以Data URL形式读取文件
    oFReader.onloadend = function (oFRevent: any) {
      const src = oFRevent.target.result // 获取文件内容
      const image = new Image() // 创建Image对象
      image.src = src // 设置Image对象的src属性
      image.onload = function () {
        // 图片加载完成后
        resolve({
          // 返回包含图片对象、宽度和高度的对象
=======
const store = useEdtiorStore()
export const innerImg = async (file: Blob) => {
  if (!validateFile(file)) return // 文件检查
  let image = await transformIamge(file) // 获取文件图片
  image = compressIamge(image) // 等比裁切后的图片
  image = base64Iamge(image) // 转换为base64的图片
  return image
}

// 文件检查
const validateFile = (file: any) => {
  const sizeLimit = 10 * 1024 * 1024
  const leaalExts = [".jpg", ".jpeg", ".png"]
  if (file.size > sizeLimit) {
    ElMessage.error("文件过大")
    return false
  }
  // toLowerCase 将名字转换为小写
  const name = file.name.toLowerCase()
  // some 检测数组中的元素是否满足指定条件
  // endsWith 判断当前字符串是否是以指定的子字符串结尾的
  if (!leaalExts.some((ext) => name.endsWith(ext))) {
    ElMessage.error("文件类型错误")
    return false
  }
  return true
}

// 转换为图片
const transformIamge = (file: Blob) => {
  return new Promise(function (resolve) {
    const oFReader = new FileReader()
    oFReader.readAsDataURL(file)
    oFReader.onloadend = function (oFRevent: any) {
      const src = oFRevent.target.result
      const image = new Image()
      image.src = src
      image.onload = function () {
        resolve({
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
          width: image.width,
          height: image.height,
          image
        })
      }
    }
  })
}

<<<<<<< HEAD
/**
 * 压缩图片比例并返回压缩后的宽高和图片对象
 * @param file 包含图片宽度、高度和图片对象的对象
 * @returns 压缩后的宽高和图片对象
 */
export const compressImage = (file: { width: any; height: any; image: any } | any) => {
  let compressFlag = false // 图片是否需要压缩的标志
  let sizeRatio = 0 // 压缩宽高比例
=======
// 压缩图片比例
const compressIamge = (file: { width: any; height: any; image: any } | any) => {
  let compressFlag = false // 图片是否压缩
  let sizeRatio = 0 // 图片压缩宽高比例
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  let maxWidth = 750 // 图片最大宽度
  let maxHeight = 600 // 图片最大高度
  const { width, height, image } = file

<<<<<<< HEAD
  // 如果图片高度大于最大高度且宽度大于最大宽度
  if (height > maxHeight && width > maxWidth) {
    compressFlag = true
    sizeRatio = height / maxHeight // 计算宽高比例
    maxWidth = width / sizeRatio // 根据比例重新计算宽度
  } else if (width > maxWidth) {
    // 如果图片宽度大于最大宽度
    compressFlag = true
    sizeRatio = width / maxWidth // 计算宽高比例
    maxHeight = height / sizeRatio // 根据比例重新计算高度
  } else if (height > maxHeight) {
    // 如果图片高度大于最大高度
    compressFlag = true
    sizeRatio = height / maxHeight // 计算宽高比例
    maxWidth = width / sizeRatio // 根据比例重新计算宽度
=======
  // 如果图片高度大于最大高度就等比压缩图片的宽度
  if (height > maxHeight && width > maxWidth) {
    compressFlag = true
    sizeRatio = height / maxHeight
    maxWidth = width / sizeRatio
  } else if (width > maxWidth) {
    compressFlag = true
    sizeRatio = width / maxWidth
    maxHeight = height / sizeRatio
  } else if (height > maxHeight) {
    compressFlag = true
    sizeRatio = height / maxHeight
    maxWidth = width / sizeRatio
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  }
  // 如果不需要压缩
  if (!compressFlag) {
    maxWidth = width
    maxHeight = height
  }
  return {
    width: maxWidth,
    height: maxHeight,
    image
  }
}

<<<<<<< HEAD
const store = useEdtiorStore()

/**
 * 将图片对象转换为 base64 编码的字符串
 * @param file 包含图片宽度、高度和图片对象的对象
 * @returns base64 编码的图片字符串、宽度和高度
 */
export const base64Image = (file: { width: number; height: number; image: any } | any) => {
  const { width, height, image } = file
  const COMPRESS_RATIO = store.compress // 获取压缩比例（0-1）
  const canvas = document.createElement("canvas") // 创建 canvas 元素
  const ctx = canvas.getContext("2d") // 获取绘制上下文
=======
// 转为base64
const base64Iamge = (file: { width: number; height: number; image: any } | any) => {
  const { width, height, image } = file
  // 创建canvas
  const COMPRESSRATIO = store.compress // 压缩比例 0 - 1
  console.log("COMPRESSRATIO :>> ", COMPRESSRATIO)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  canvas.setAttribute("id", "canvas")
  canvas.width = width
  canvas.height = height
  ctx?.clearRect(0, 0, width, height) // 清除画布内所有像素
<<<<<<< HEAD
  ctx?.drawImage(image, 0, 0, width, height) // 绘制图片到画布上
  const compressedImage = canvas.toDataURL("image/jpeg", COMPRESS_RATIO) // 将画布内容转换为 base64 编码的字符串

  return {
    src: compressedImage,
=======
  ctx?.drawImage(image, 0, 0, width, height) // 绘制canvas
  const compressImage = canvas.toDataURL("image/jpeg", COMPRESSRATIO) // 设置压缩类型和压缩比例获取压缩后的文件

  return {
    src: compressImage,
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    width,
    height
  }
}
