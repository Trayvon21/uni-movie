import service from "./index.js"

function urlFormat(url, data) {
	let arr = []
	console.log(data);
	for (var i in data) {
		arr.push(`&${i}=${data[i]}`)
	}
	return `https://www.imovietrailer.com/superhero${url}?qq=2684425594${arr.join('')}`
}
export default {
	getCarouse() {
		return service.post(urlFormat("/index/carousel/list"))
	},
	getUlick() {
		return service.post(urlFormat("/index/guessULike"))
	},
	getHotList(data) {
		return service.post(urlFormat("/index/movie/hot", data))
	},
	search(data) {
		return service.post(urlFormat("/search/list", data))
	},
	login(user) {
		return service.post(urlFormat("/user/registOrLogin"), user)
	},
	getDetail(id) {
		return service.post(urlFormat(`/search/trailer/${id}/`))
	},
	getCast(id, role) {
		return service.post(urlFormat(`/search/staff/${id}/${role}`))
	},
	appUnionLogin(type, data) {
		return service.post(urlFormat(`/appUnionLogin/${type}`), data)
	},
	changeUserInfo(data) {
		return service.post(urlFormat(`/user/modifyUserinfo`), data)
	},
	logout(userId) {
		return service.post(urlFormat(`/user/logout`, userId))
	},


}
