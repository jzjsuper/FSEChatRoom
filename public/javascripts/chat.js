function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

// See https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$( document ).ready(function() {
  var chat_area = $("#chat-area");
  var chat_block_template = $("#chat-block-template");
  var post_button = $("#post-button");
  var message_type_area = $("#message-type-area");
  var my_name = getParameterByName("name");
  var add_message = function(name, time, message) {
    var new_chat_block = chat_block_template.clone();
    if (!isBlank(message)) {
      if (name === my_name) { // My message
        new_chat_block.find(".name-area").text("Me");
        new_chat_block.addClass("bg-success");
      } else {
        new_chat_block.find(".name-area").text(name);
        new_chat_block.addClass("bg-info");
      }
      new_chat_block.find(".date-area").text(time);
      new_chat_block.find(".message-area").text(message);
      chat_area.append(new_chat_block);
      new_chat_block.show();
    }
  };
  var socket = io();
  post_button.click(function() {
    var message = message_type_area.val();
    socket.emit('message', {
      name: my_name,
      message: message
    })
    message_type_area.val("");
  });

  socket.on('message', function(msg) {
    add_message(msg.name, msg.time, msg.message);
  })


});
