!function(){function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec9a8.register("izPFg",(function(t,n){e(t.exports,"conf",(function(){return o})),e(t.exports,"language",(function(){return i}));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.0(252e010eb73ddc2fa1a37c1dade7bf35d87106cd)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var o={comments:{lineComment:"#"}},i={defaultToken:"keyword",ignoreCase:!0,tokenPostfix:".azcli",str:/[^#\s]/,tokenizer:{root:[{include:"@comment"},[/\s-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}],[/^-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}]],type:[{include:"@comment"},[/-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":"key.identifier"}}],[/@str+\s*/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}]],comment:[[/#.*$/,{cases:{"@eos":{token:"comment",next:"@popall"}}}]]}}}))}();
//# sourceMappingURL=azcli.a4e3446c.js.map
