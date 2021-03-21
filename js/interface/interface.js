import Req from '../base/util'

const url = "https://127.0.0.1:3000"
const model = {}

function interfaceTest(){
  wx.login({
    success: res => {
      Req({url: url + "/util/openid",
           data:{code: res.code,
                 app: "ball"}
          })
      .then( e => {
        let openid = e.data.openid //返回openid
        console.log('openid: ' + openid);
        model[openid] = {
          "x": 0,
          "y": 0
        }

        Req({url: url + "/game/start/" + openid,
             data: model})
        .then( e => {
          let gameid = e.data.game_id
          console.log('gameid: ' + gameid)
          let status = e.data.status
          console.log('status: ' + status)

          model.ball = {start: openid}
          Req({url: url + "/game/update/" + openid + "/" + gameid,
               data: model})
          .then( e => {
            console.log(e.data)
          })
        })    
      })

      
    }
  })
}
interfaceTest()