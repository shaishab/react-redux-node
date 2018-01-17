'use strict';

module.exports = {
	logging:{
		actions:{
			userSignUp:'customerSignUp',
			userSignIn:'customerSignIn',
			signOut:'signOut',
			saveOAuthUserProfile: 'saveOAuthUserProfile',
			userList: 'userList',
			getUser:'getUser',
			getUserProfile:'getUserProfile',
			updateUserProfile:'updateUserProfile'
  	},// end action
		locations:{
			userServerController:'user.server.controller'
		},// end location
		status:{
			success: 'success',
			failed: 'failed'
		}
	}
} ;