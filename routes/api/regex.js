const axios = require('axios');
const regex = /(?:\{body\:)(.*?),ftentidentifier/g;
const regex2 = /(?:\{text\:)\"(.*?)\"/g;
const regex3 = /(?:author\:)\"(.*?)\"/g;
const regex4 = /(?:",id\:\"(.*?)\",fbid)/g;
let m, m1, m2, m3;
let commentAndid = [];


function removeDuplicates(array, key) {
	return array.filter((obj, index, self) => index === self.findIndex((el) =>
		(el[key] === obj[key]))
	)
}


function regexcomment(url_live) {

	return axios.get(url_live).then(async response => {
		while ((m = await regex.exec(response.data)) !== null) {

			if (m.index === regex.lastIndex) {
				await regex.lastIndex++
			}

			m.forEach((match, groupIndex) => {

				if (groupIndex == 1) {
					const all = {
						comment: match,
					};
					

					while ((m1 =  regex2.exec(all.comment)) !== null) {
						while ((m2 =  regex3.exec(all.comment)) !== null) {
							while ((m3 =  regex4.exec(all.comment)) !== null) {
									const pushcommentAndId = {
										comment: m1[1],
										id: m2[1],
										id_comment: m3[1],
									};
									commentAndid.push(pushcommentAndId);
							}
						}
					}
				}
			})
		}
		let data = removeDuplicates(commentAndid, "id_comment");
		return data

	})


}

regexcomment("https://www.facebook.com/watch/live/?v=").then((data) => {
	console.log(data)
})

// module.exports = {
// 	regexcomment
// };
