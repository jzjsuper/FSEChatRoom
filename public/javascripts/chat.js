function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

$( document ).ready(function() {
  var chat_area = $("#chat-area");
  var chat_block_template = $("#chat-block-template");
  var post_button = $("#post-button");
  var message_type_area = $("#message-type-area");
  post_button.click(function() {
    var new_chat_block = chat_block_template.clone();
    var message = message_type_area.val();
    if (!isBlank(message)) {
      new_chat_block.find(".name-area").text("Me");
      new_chat_block.find(".date-area").text("12-23");
      new_chat_block.find(".message-area").text(message);
      chat_area.append(new_chat_block);
      new_chat_block.show();
    }
    message_type_area.val("");
  });

  var socket = io();
});
