const Hiven = require("hiven");
const client = new Hiven.Client({type: "user"});
const config = require("./config.json");
const util = require("util");
const { join } = require("path");

client.on("init", () => {
  console.log("Connected to Hiven Swarm!");
});

client.on("message", (message) => {
  if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  
if(command === "mericleak") {
  message.room.send("https://media.hiven.io/v1/attachments/183582813251957528/image.png")
}


  if(command === "ping") {
    message.room.send("Pong!").then(x => {
      x.edit(`${x.timestamp - message.timestamp}ms!`);
    });
  } else if(message.author.id === "your_user_id_here" && command === "eval") {
    try {
      const stdout = util.inspect(eval(args.join(" ")), {depth: 0});
      if(stdout.includes(config.token)) {
      message.room.send(":warning: output contains token!");
      } else {
      message.room.send(`\`\`\`js\n${stdout}\`\`\``);
      }
    } catch(err) {
      message.room.send(`\`\`\`js\n${err}\`\`\``);
    }
  }
});
client.connect(config.token)