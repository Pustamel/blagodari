import { useEffect, useState } from 'react'

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function delete_cookie(name: string) {
  document.cookie = name + '=; Max-Age=-1'
}

export function useWindowDimensions() {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const toBase64 = async (event: any) => {
  if (event.target.files.length > 0) {
    const photoFile = event.target.files[0]

    const fr = new FileReader()
    fr.readAsDataURL(photoFile)
    return new Promise(resolve => {
      fr.onload = () => {
        let photo
        const fbase64 = fr.result
        if (typeof fbase64 === 'string') {
          const from1 = fbase64.search('base64') + 7
          const to1 = fbase64.length
          photo = fbase64.substr(from1, to1)
        }
        resolve(photo)
      }
    })
  }
}

export const nowDate = () => {
  const now = new Date().toDateString()
  return Date.parse(now)
}
