
// const source = await Deno.readTextFile("../../data/source.js");
// console.log('source:', source);

const decoder = new TextDecoder("utf-8");
let data = await Deno.readFile("../../data/source.js");
// console.log(decoder.decode(data));
console.log(decoder.decode(data));
const contentBytes = new TextEncoder().encode("Hello World");
await Deno.writeFile("../../data/source.js", contentBytes, {append: true});
// data.state.name = 'test';
// await Deno.writeFile("hello4.js", data, {append: true}); 
// console.log('writed');


