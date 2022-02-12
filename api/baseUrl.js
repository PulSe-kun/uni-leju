var baseurl;

if (process.env.NODE_ENV === 'development') {
	//console.log('开发环境')
	baseurl = "http://localhost"
} else {
	//console.log('生产环境')
	baseurl = "http://leju.bufan.cloud"
}
export default baseurl;
