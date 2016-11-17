var amqp = require("amqplib/callback_api");

amqp.connect("amqp://incowiz:incowiz@192.168.0.104", function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = "task_queue"

    ch.assertQueue(q, {durable: true}); //use task queue
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());

      setTimeout(function() {
        console.log(" [x] Done");
      }, secs * 1000);
    }, {noAck: false}); // {noAck: false} Message acknowledgments turns on 
  });
});