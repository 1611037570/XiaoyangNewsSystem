import { useEdtiorStore } from "@/stores/editor"
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
          width: image.width,
          height: image.height,
          image
        })
      }
    }
  })
}

// 压缩图片比例
const compressIamge = (file: { width: any; height: any; image: any } | any) => {
  let compressFlag = false // 图片是否压缩
  let sizeRatio = 0 // 图片压缩宽高比例
  let maxWidth = 750 // 图片最大宽度
  let maxHeight = 600 // 图片最大高度
  const { width, height, image } = file

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

// 转为base64
const base64Iamge = (file: { width: number; height: number; image: any } | any) => {
  const { width, height, image } = file
  // 创建canvas
  const COMPRESSRATIO = store.compress // 压缩比例 0 - 1
  console.log("COMPRESSRATIO :>> ", COMPRESSRATIO)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.setAttribute("id", "canvas")
  canvas.width = width
  canvas.height = height
  ctx?.clearRect(0, 0, width, height) // 清除画布内所有像素
  ctx?.drawImage(image, 0, 0, width, height) // 绘制canvas
  const compressImage = canvas.toDataURL("image/jpeg", COMPRESSRATIO) // 设置压缩类型和压缩比例获取压缩后的文件

  return {
    src: compressImage,
    width,
    height
  }
}
