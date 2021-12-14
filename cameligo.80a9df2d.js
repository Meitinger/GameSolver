!function(){function e(e,o,n,t){Object.defineProperty(e,o,{get:n,set:t,enumerable:!0,configurable:!0})}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec9a8.register("j9TVW",(function(o,n){e(o.exports,"conf",(function(){return t})),e(o.exports,"language",(function(){return s}));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.0(252e010eb73ddc2fa1a37c1dade7bf35d87106cd)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var t={comments:{lineComment:"//",blockComment:["(*","*)"]},brackets:[["{","}"],["[","]"],["(",")"],["<",">"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'},{open:"(*",close:"*)"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'},{open:"(*",close:"*)"}]},s={defaultToken:"",tokenPostfix:".cameligo",ignoreCase:!0,brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"},{open:"<",close:">",token:"delimiter.angle"}],keywords:["abs","assert","block","Bytes","case","Crypto","Current","else","failwith","false","for","fun","if","in","let","let%entry","let%init","List","list","Map","map","match","match%nat","mod","not","operation","Operation","of","record","Set","set","sender","skip","source","String","then","to","true","type","with"],typeKeywords:["int","unit","string","tz","nat","bool"],operators:["=",">","<","<=",">=","<>",":",":=","and","mod","or","+","-","*","/","@","&","^","%","->","<-","&&","||"],symbols:/[=><:@\^&|+\-*\/\^%]+/,tokenizer:{root:[[/[a-zA-Z_][\w]*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":"identifier"}}],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,{cases:{"@operators":"delimiter","@default":""}}],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/\$[0-9a-fA-F]{1,16}/,"number.hex"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/'/,"string","@string"],[/'[^\\']'/,"string"],[/'/,"string.invalid"],[/\#\d+/,"string"]],comment:[[/[^\(\*]+/,"comment"],[/\*\)/,"comment","@pop"],[/\(\*/,"comment"]],string:[[/[^\\']+/,"string"],[/\\./,"string.escape.invalid"],[/'/,{token:"string.quote",bracket:"@close",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,"white"],[/\(\*/,"comment","@comment"],[/\/\/.*$/,"comment"]]}}}))}();
//# sourceMappingURL=cameligo.80a9df2d.js.map
