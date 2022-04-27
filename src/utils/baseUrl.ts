export const baseUrl = () =>{
  let url = ''
  if(API_ENV === 'dev'){
    url = 'http://127.0.0.1:7001'
  }
  if(API_ENV === 'prod'){
    url = 'http://back.sizhouweb.cn'
  }
  return url
}