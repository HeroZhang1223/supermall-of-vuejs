import {request} from "./request.js"

export function getDetail(iid){
	return request({
		url:"/detail",
		params:{
			iid
		}
	})
}

export function getRecommend(){
	return request({
		url:"/recommend"
	})
}

export class Goods{
	constructor(itemInfo,columns,services) {
		this.title=itemInfo.title
		this.desc=itemInfo.desc
		this.newPrice=itemInfo.price
		this.oldPrice=itemInfo.oldPrice
		this.discount=itemInfo.discountDesc
		this.columns=columns
		this.services=services
		this.realPrice=itemInfo.lowNowPrice
	}
}

export class Shop{
	constructor(shopInfo) {
	    this.logo=shopInfo.shopLogo
		this.name=shopInfo.name
		this.fans=shopInfo.cFans
		this.sells=shopInfo.cSells
		this.score=shopInfo.score
		this.goodsCount=shopInfo.cGoods
	}
}

export class GoodsParam{
	constructor(info,rule) {
		//注意：有些商品信息中没有图片，有些商品信息有图片
	    this.image=info.image ? info.image[0] : "",
		this.infos=info.set
		this.sizes=rule.tables
	}
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

