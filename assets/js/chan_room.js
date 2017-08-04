 // window.Rebel.channels.user.channel

console.log('... chan_room.js loading')
function start_room_channel(ucc_chat, socket) {
  console.log('chan_room connect')
  let ucxchat = ucc_chat.ucxchat
  let room = ucxchat.room
  let debug = ucc_chat.debug
  let typing = ucc_chat.typing
  // Now that you are connected, you can join channels with a topic:
  let chan = window.Rebel.channels.room.channel

  if (debug) { console.log('start socket', ucxchat) }

  chan.on("user:entered", msg => {
  })

  chan.on("user:leave", msg => {
  })

  chan.on("message:new", msg => {
    if (debug) { console.log('message:new current id, msg.user_id', msg, ucxchat.user_id, msg.user_id) }
    ucc_chat.Messages.new_message(msg)
  })
  chan.on("message:update", msg => {
    if (debug) { console.log('message:update current id, msg.user_id', msg, ucxchat.user_id, msg.user_id) }
    ucc_chat.Messages.update_message(msg)
  })

  chan.on("typing:update", msg => {
    if (debug) { console.log('typing:update', msg) }
    typing.update_typing(msg.typing)
  })

  chan.on("room:update", msg => {
    ucc_chat.roomManager.update(msg)
  })

  chan.on("toastr:success", resp => {
    window.toastr.success(resp.message)
  })

  chan.on("toastr:error", resp => {
    window.toastr.error(resp.message)
  })

  chan.on("sweet:open", resp => {
    $('.sweet-container').html(resp.html)
  })

  chan.on('update:Members List', msg => {
    //console.log('update:Members List', msg)
    // console.log('update:Members List', msg, $('.tab-button[title="Members List"]').hasClass('active'))
  })
  chan.on('code:update', resp => {
    console.log('code:update', resp)
    ucc_chat.utils.code_update(resp)
  })
  chan.on('code:update:reaction', resp => {
    ucc_chat.utils.code_update(resp)
  })
  chan.on('reload', msg => {
    let loc = msg.location
    if (!loc) { loc = "/" }
    console.log('location', loc)
    window.location = loc
  })
  chan.on('message:preview', msg => {
    ucc_chat.message_preview(msg)
  })

  ucc_chat.roomchan = chan;

  ucc_chat.roomManager.clear_unread()
  ucc_chat.roomManager.new_room()
  ucc_chat.roomHistoryManager.scroll_new_window()

  ucc_chat.main.run(ucc_chat)
  ucc_chat.roomManager.updateMentionsMarksOfRoom()

  if (window.Rebel) {
    window.Rebel.set_event_handlers('#flex-tabs')
  }

  ucc_chat.navMenu.close()

}

UccChat.on_connect(function(ucc_chat, socket) {
  start_room_channel(ucc_chat, socket)

  $('body').on('restart-socket', () => {
    start_room_channel(ucc_chat, socket)
  })
})