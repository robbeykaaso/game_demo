import util from '../base/util'

const url = "https://127.0.0.1:3000"
const model = {}

async function interfaceTest(){
  let res = await util.login()

  res = await util.request({url: url + "/util/openid",
                            data: {
                              code: res.code,
                              app: "ball"
                            }
        })
  let openid = res.data.openid //返回openid
  console.log('openid: ' + openid);
  model[openid] = {
    "x": 0,
    "y": 0
  }

  res = await util.request({url: url + "/game/start/" + openid,
                            data: model})
  let gameid = res.data.game_id
  console.log('gameid: ' + gameid)
  let status = res.data.status
  console.log('status: ' + status)

  model.ball = {start: openid}
  res = await util.request({url: url + "/game/update/" + openid + "/" + gameid,
                            data: model})
  console.log(res.data)
}
interfaceTest()