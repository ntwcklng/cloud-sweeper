var Storage = (function Storage(){

	var publicAPI, ls;

	ls = localStorage;

	publicAPI = {
		updateBestScore: updateBestScore,
	}

	return publicAPI;

	function getDifficultyString(difficulty) {
		switch (difficulty) {
			case 0:
				return "easy";
				break;
			case 1:
				return "medium";
				break;
			case 2:
				return "hard";
				break;
			default:
				return null;
		}
	}
	function updateBestScore(difficulty, score) {
		if(typeof ls === "undefined") {
			return score;
		}
		var maxScore = score;
		var getDifficulty = getDifficultyString(difficulty);
		var storeData = {
			version: Debug.BUILD_VERSION,
			easy: {
				score: 0
			},
			medium: {
				score: 0
			},
			hard: {
				score: 0
			}
		};

		var getStorageScore = JSON.parse(ls.getItem("bestCloudScore"));

		if(getStorageScore) {
			// overwrite the template
			storeData = getStorageScore;
			var storedBuildVersion = storeData.version.split(".");
			var actualBuildVersion = Debug.BUILD_VERSION.split(".");

			if(storedBuildVersion[0] !== actualBuildVersion[0] || storedBuildVersion[1] !== actualBuildVersion[1]) {
				// reset all scores, when there was a minor/major update
				storeData.easy.score = 0;
				storeData.medium.score = 0;
				storeData.hard.score = 0;
			}
			maxScore = Math.max(
				score,
				storeData[getDifficulty].score
			);
		}
		storeData.version = Debug.BUILD_VERSION;
		storeData[getDifficulty].score = maxScore;
		ls.setItem("bestCloudScore", JSON.stringify(storeData));
		return maxScore;
	}

})();
