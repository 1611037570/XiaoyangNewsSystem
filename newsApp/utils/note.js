import {
	unify
} from "@/service/api/unify.js"

export async function getNotes() {
	let res = await unify({
		name: "note",
		all: true
	})
	let note = shuffleCards(res.data)
	console.log(note);
	return note[0]
};


/**
 * 洗牌算法
 * @author 杨南南<1611037570@qq.com>
 * 	洗牌算法可以解决随机性问题
 */
export function shuffleCards(cards) {
	const c = [...cards];
	for (let j = 0; j < 10; j++) {
		for (let i = c.length; i > 0; i--) {
			const random = Math.floor(Math.random() * i);
			[c[random], c[i - 1]] = [c[i - 1], c[random]];
		}
	}
	return c;
}
