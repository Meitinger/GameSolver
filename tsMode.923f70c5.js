!function(){function e(e){return e&&e.__esModule?e.default:e}function t(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec9a8;r.register("bd8YY",(function(n,i){t(n.exports,"setupTypeScript",(function(){return re})),t(n.exports,"setupJavaScript",(function(){return ne})),t(n.exports,"getJavaScriptWorker",(function(){return ie})),t(n.exports,"getTypeScriptWorker",(function(){return ae}));var a=r("8TSCy"),s=r("2TvXO"),o=r("2nnEZ"),u=Object.defineProperty,c=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,d=Object.prototype.hasOwnProperty,f={};u(f,"__esModule",{value:!0}),function(e,t,r){if(t&&"object"==typeof t||"function"==typeof t){var n=!0,i=!1,a=void 0;try{for(var s,o=function(n,i){var a=i.value;d.call(e,a)||"default"===a||u(e,a,{get:function(){return t[a]},enumerable:!(r=c(t,a))||r.enumerable})},f=l(t)[Symbol.iterator]();!(n=(s=f.next()).done);n=!0)o(0,s)}catch(e){i=!0,a=e}finally{try{n||null==f.return||f.return()}finally{if(i)throw a}}}}(f,o);var p,g,b,h,m,v,y,k,x,S,_=function(){"use strict";function t(e,r){var n=this;a.classCallCheck(this,t),this._modeId=e,this._defaults=r,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return n._updateExtraLibs()}))}return a.createClass(t,[{key:"_stopWorker",value:function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}},{key:"dispose",value:function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}},{key:"_updateExtraLibs",value:function(){var t=this;return a.asyncToGenerator(e(s).mark((function r(){var n,i;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t._worker){e.next=2;break}return e.abrupt("return");case 2:return n=++t._updateExtraLibsToken,e.next=5,t._worker.getProxy();case 5:if(i=e.sent,t._updateExtraLibsToken===n){e.next=8;break}return e.abrupt("return");case 8:i.updateExtraLibs(t._defaults.getExtraLibs());case 9:case"end":return e.stop()}}),r)})))()}},{key:"_getClient",value:function(){if(!this._client){var e=this;this._worker=f.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then((function(t){var r=e;return e._worker?e._worker.withSyncedResources(f.editor.getModels().filter((function(e){return e.getLanguageId()===r._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client}},{key:"getLanguageServiceWorker",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n,i=this;return this._getClient().then((function(e){n=e})).then((function(e){if(i._worker)return i._worker.withSyncedResources(t)})).then((function(e){return n}))}}]),t}();(g=p||(p={}))[g.None=0]="None",g[g.CommonJS=1]="CommonJS",g[g.AMD=2]="AMD",g[g.UMD=3]="UMD",g[g.System=4]="System",g[g.ES2015=5]="ES2015",g[g.ESNext=99]="ESNext",(h=b||(b={}))[h.None=0]="None",h[h.Preserve=1]="Preserve",h[h.React=2]="React",h[h.ReactNative=3]="ReactNative",h[h.ReactJSX=4]="ReactJSX",h[h.ReactJSXDev=5]="ReactJSXDev",(v=m||(m={}))[v.CarriageReturnLineFeed=0]="CarriageReturnLineFeed",v[v.LineFeed=1]="LineFeed",(k=y||(y={}))[k.ES3=0]="ES3",k[k.ES5=1]="ES5",k[k.ES2015=2]="ES2015",k[k.ES2016=3]="ES2016",k[k.ES2017=4]="ES2017",k[k.ES2018=5]="ES2018",k[k.ES2019=6]="ES2019",k[k.ES2020=7]="ES2020",k[k.ESNext=99]="ESNext",k[k.JSON=100]="JSON",k[k.Latest=99]="Latest",(S=x||(x={}))[S.Classic=1]="Classic",S[S.NodeJs=2]="NodeJs";var C=function(){"use strict";function e(t,r,n,i){a.classCallCheck(this,e),this._onDidChange=new f.Emitter,this._onDidExtraLibsChange=new f.Emitter,this._extraLibs=Object.create(null),this._removedExtraLibs=Object.create(null),this._eagerModelSync=!1,this.setCompilerOptions(t),this.setDiagnosticsOptions(r),this.setWorkerOptions(n),this.setInlayHintsOptions(i),this._onDidExtraLibsChangeTimeout=-1}return a.createClass(e,[{key:"onDidChange",get:function(){return this._onDidChange.event}},{key:"onDidExtraLibsChange",get:function(){return this._onDidExtraLibsChange.event}},{key:"workerOptions",get:function(){return this._workerOptions}},{key:"inlayHintsOptions",get:function(){return this._inlayHintsOptions}},{key:"getExtraLibs",value:function(){return this._extraLibs}},{key:"addExtraLib",value:function(e,t){var r,n=this;if(r=void 0===t?"ts:extralib-".concat(Math.random().toString(36).substring(2,15)):t,this._extraLibs[r]&&this._extraLibs[r].content===e)return{dispose:function(){}};var i=1;return this._removedExtraLibs[r]&&(i=this._removedExtraLibs[r]+1),this._extraLibs[r]&&(i=this._extraLibs[r].version+1),this._extraLibs[r]={content:e,version:i},this._fireOnDidExtraLibsChangeSoon(),{dispose:function(){var e=n._extraLibs[r];e&&e.version===i&&(delete n._extraLibs[r],n._removedExtraLibs[r]=i,n._fireOnDidExtraLibsChangeSoon())}}}},{key:"setExtraLibs",value:function(e){for(var t in this._extraLibs)this._removedExtraLibs[t]=this._extraLibs[t].version;this._extraLibs=Object.create(null);var r=!0,n=!1,i=void 0;if(e&&e.length>0)try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var o=a.value,u=o.filePath||"ts:extralib-".concat(Math.random().toString(36).substring(2,15)),c=o.content,l=1;this._removedExtraLibs[u]&&(l=this._removedExtraLibs[u]+1),this._extraLibs[u]={content:c,version:l}}}catch(e){n=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}this._fireOnDidExtraLibsChangeSoon()}},{key:"_fireOnDidExtraLibsChangeSoon",value:function(){var e=this;-1===this._onDidExtraLibsChangeTimeout&&(this._onDidExtraLibsChangeTimeout=window.setTimeout((function(){e._onDidExtraLibsChangeTimeout=-1,e._onDidExtraLibsChange.fire(void 0)}),0))}},{key:"getCompilerOptions",value:function(){return this._compilerOptions}},{key:"setCompilerOptions",value:function(e){this._compilerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"getDiagnosticsOptions",value:function(){return this._diagnosticsOptions}},{key:"setDiagnosticsOptions",value:function(e){this._diagnosticsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setWorkerOptions",value:function(e){this._workerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setInlayHintsOptions",value:function(e){this._inlayHintsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setMaximumWorkerIdleTime",value:function(e){}},{key:"setEagerModelSync",value:function(e){this._eagerModelSync=e}},{key:"getEagerModelSync",value:function(){return this._eagerModelSync}}]),e}(),w=new C({allowNonTsExtensions:!0,target:99},{noSemanticValidation:!1,noSyntaxValidation:!1,onlyVisible:!1},{},{}),D=new C({allowNonTsExtensions:!0,allowJs:!0,target:99},{noSemanticValidation:!0,noSyntaxValidation:!1,onlyVisible:!1},{},{});function L(){return Promise.resolve(n.exports)}f.languages.typescript={ModuleKind:p,JsxEmit:b,NewLineKind:m,ScriptTarget:y,ModuleResolutionKind:x,typescriptVersion:"4.4.4",typescriptDefaults:w,javascriptDefaults:D,getTypeScriptWorker:function(){return L().then((function(e){return e.getTypeScriptWorker()}))},getJavaScriptWorker:function(){return L().then((function(e){return e.getJavaScriptWorker()}))}},f.languages.onLanguage("typescript",(function(){return L().then((function(e){return e.setupTypeScript(w)}))})),f.languages.onLanguage("javascript",(function(){return L().then((function(e){return e.setupJavaScript(D)}))}));var O,T,E={};function F(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if("string"==typeof e)return e;if(void 0===e)return"";var n="";if(r){n+=t;for(var i=0;i<r;i++)n+="  "}n+=e.messageText,r++;var a=!0,s=!1,o=void 0;if(e.next)try{for(var u,c=e.next[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var l=u.value;n+=F(l,t,r)}}catch(e){s=!0,o=e}finally{try{a||null==c.return||c.return()}finally{if(s)throw o}}return n}function I(e){return e?e.map((function(e){return e.text})).join(""):""}E["lib.d.ts"]=!0,E["lib.dom.d.ts"]=!0,E["lib.dom.iterable.d.ts"]=!0,E["lib.es2015.collection.d.ts"]=!0,E["lib.es2015.core.d.ts"]=!0,E["lib.es2015.d.ts"]=!0,E["lib.es2015.generator.d.ts"]=!0,E["lib.es2015.iterable.d.ts"]=!0,E["lib.es2015.promise.d.ts"]=!0,E["lib.es2015.proxy.d.ts"]=!0,E["lib.es2015.reflect.d.ts"]=!0,E["lib.es2015.symbol.d.ts"]=!0,E["lib.es2015.symbol.wellknown.d.ts"]=!0,E["lib.es2016.array.include.d.ts"]=!0,E["lib.es2016.d.ts"]=!0,E["lib.es2016.full.d.ts"]=!0,E["lib.es2017.d.ts"]=!0,E["lib.es2017.full.d.ts"]=!0,E["lib.es2017.intl.d.ts"]=!0,E["lib.es2017.object.d.ts"]=!0,E["lib.es2017.sharedmemory.d.ts"]=!0,E["lib.es2017.string.d.ts"]=!0,E["lib.es2017.typedarrays.d.ts"]=!0,E["lib.es2018.asyncgenerator.d.ts"]=!0,E["lib.es2018.asynciterable.d.ts"]=!0,E["lib.es2018.d.ts"]=!0,E["lib.es2018.full.d.ts"]=!0,E["lib.es2018.intl.d.ts"]=!0,E["lib.es2018.promise.d.ts"]=!0,E["lib.es2018.regexp.d.ts"]=!0,E["lib.es2019.array.d.ts"]=!0,E["lib.es2019.d.ts"]=!0,E["lib.es2019.full.d.ts"]=!0,E["lib.es2019.object.d.ts"]=!0,E["lib.es2019.string.d.ts"]=!0,E["lib.es2019.symbol.d.ts"]=!0,E["lib.es2020.bigint.d.ts"]=!0,E["lib.es2020.d.ts"]=!0,E["lib.es2020.full.d.ts"]=!0,E["lib.es2020.intl.d.ts"]=!0,E["lib.es2020.promise.d.ts"]=!0,E["lib.es2020.sharedmemory.d.ts"]=!0,E["lib.es2020.string.d.ts"]=!0,E["lib.es2020.symbol.wellknown.d.ts"]=!0,E["lib.es2021.d.ts"]=!0,E["lib.es2021.full.d.ts"]=!0,E["lib.es2021.promise.d.ts"]=!0,E["lib.es2021.string.d.ts"]=!0,E["lib.es2021.weakref.d.ts"]=!0,E["lib.es5.d.ts"]=!0,E["lib.es6.d.ts"]=!0,E["lib.esnext.d.ts"]=!0,E["lib.esnext.full.d.ts"]=!0,E["lib.esnext.intl.d.ts"]=!0,E["lib.esnext.promise.d.ts"]=!0,E["lib.esnext.string.d.ts"]=!0,E["lib.esnext.weakref.d.ts"]=!0,E["lib.scripthost.d.ts"]=!0,E["lib.webworker.d.ts"]=!0,E["lib.webworker.importscripts.d.ts"]=!0,E["lib.webworker.iterable.d.ts"]=!0,(T=O||(O={}))[T.None=0]="None",T[T.Block=1]="Block",T[T.Smart=2]="Smart";var N,A,P=function(){"use strict";function e(t){a.classCallCheck(this,e),this._worker=t}return a.createClass(e,[{key:"_textSpanToRange",value:function(e,t){var r=e.getPositionAt(t.start),n=e.getPositionAt(t.start+t.length);return{startLineNumber:r.lineNumber,startColumn:r.column,endLineNumber:n.lineNumber,endColumn:n.column}}}]),e}(),M=function(){"use strict";function t(e){a.classCallCheck(this,t),this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return a.createClass(t,[{key:"isLibFile",value:function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!E[e.path.slice(1)])}},{key:"getOrCreateModel",value:function(e){var t=f.Uri.parse(e),r=f.editor.getModel(t);if(r)return r;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return f.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);var n=w.getExtraLibs()[e];return n?f.editor.createModel(n.content,"typescript",t):null}},{key:"_containsLibFile",value:function(e){var t=!0,r=!1,n=void 0;try{for(var i,a=e[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var s=i.value;if(this.isLibFile(s))return!0}}catch(e){r=!0,n=e}finally{try{t||null==a.return||a.return()}finally{if(r)throw n}}return!1}},{key:"fetchLibFilesIfNecessary",value:function(t){var r=this;return a.asyncToGenerator(e(s).mark((function n(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r._containsLibFile(t)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r._fetchLibFiles();case 4:case"end":return e.stop()}}),n)})))()}},{key:"_fetchLibFiles",value:function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise}}]),t}();(A=N||(N={}))[A.Warning=0]="Warning",A[A.Error=1]="Error",A[A.Suggestion=2]="Suggestion",A[A.Message=3]="Message";var R=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(e,t,i,s){var o;a.classCallCheck(this,n),(o=r.call(this,s))._libFiles=e,o._defaults=t,o._selector=i,o._disposables=[],o._listener=Object.create(null);var u=function(e){if(e.getLanguageId()===i){var t,r=function(){o._defaults.getDiagnosticsOptions().onlyVisible?e.isAttachedToEditor()&&o._doValidate(e):o._doValidate(e)},n=e.onDidChangeContent((function(){clearTimeout(t),t=window.setTimeout(r,500)})),a=e.onDidChangeAttached((function(){o._defaults.getDiagnosticsOptions().onlyVisible&&(e.isAttachedToEditor()?r():f.editor.setModelMarkers(e,o._selector,[]))}));o._listener[e.uri.toString()]={dispose:function(){n.dispose(),a.dispose(),clearTimeout(t)}},r()}},c=function(e){f.editor.setModelMarkers(e,o._selector,[]);var t=e.uri.toString();o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])};o._disposables.push(f.editor.onDidCreateModel((function(e){return u(e)}))),o._disposables.push(f.editor.onWillDisposeModel(c)),o._disposables.push(f.editor.onDidChangeModelLanguage((function(e){c(e.model),u(e.model)}))),o._disposables.push({dispose:function(){var e=!0,t=!1,r=void 0;try{for(var n,i=f.editor.getModels()[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var a=n.value;c(a)}}catch(e){t=!0,r=e}finally{try{e||null==i.return||i.return()}finally{if(t)throw r}}}});var l=function(){var e=!0,t=!1,r=void 0;try{for(var n,i=f.editor.getModels()[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var a=n.value;c(a),u(a)}}catch(e){t=!0,r=e}finally{try{e||null==i.return||i.return()}finally{if(t)throw r}}};return o._disposables.push(o._defaults.onDidChange(l)),o._disposables.push(o._defaults.onDidExtraLibsChange(l)),f.editor.getModels().forEach((function(e){return u(e)})),o}return a.createClass(n,[{key:"dispose",value:function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]}},{key:"_doValidate",value:function(t){var r=this;return a.asyncToGenerator(e(s).mark((function n(){var i,a,o,u,c,l,d,p,g;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r._worker(t.uri);case 2:if(i=e.sent,!t.isDisposed()){e.next=5;break}return e.abrupt("return");case 5:return a=[],o=r._defaults.getDiagnosticsOptions(),u=o.noSyntaxValidation,c=o.noSemanticValidation,l=o.noSuggestionDiagnostics,u||a.push(i.getSyntacticDiagnostics(t.uri.toString())),c||a.push(i.getSemanticDiagnostics(t.uri.toString())),l||a.push(i.getSuggestionDiagnostics(t.uri.toString())),e.next=12,Promise.all(a);case 12:if((d=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return");case 15:return p=d.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(r._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),g=p.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?f.Uri.parse(e.file.fileName):null})),e.next=19,r._libFiles.fetchLibFilesIfNecessary(g);case 19:if(!t.isDisposed()){e.next=21;break}return e.abrupt("return");case 21:f.editor.setModelMarkers(t,r._selector,p.map((function(e){return r._convertDiagnostics(t,e)})));case 22:case"end":return e.stop()}}),n)})))()}},{key:"_convertDiagnostics",value:function(e,t){var r=t.start||0,n=t.length||1,i=e.getPositionAt(r),a=i.lineNumber,s=i.column,o=e.getPositionAt(r+n),u=o.lineNumber,c=o.column,l=[];return t.reportsUnnecessary&&l.push(f.MarkerTag.Unnecessary),t.reportsDeprecated&&l.push(f.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:a,startColumn:s,endLineNumber:u,endColumn:c,message:F(t.messageText,"\n"),code:t.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}},{key:"_convertRelatedInformation",value:function(e,t){var r=this;if(!t)return[];var n=[];return t.forEach((function(t){var i=e;if(t.file&&(i=r._libFiles.getOrCreateModel(t.file.fileName)),i){var a=t.start||0,s=t.length||1,o=i.getPositionAt(a),u=o.lineNumber,c=o.column,l=i.getPositionAt(a+s),d=l.lineNumber,f=l.column;n.push({resource:i.uri,startLineNumber:u,startColumn:c,endLineNumber:d,endColumn:f,message:F(t.messageText,"\n")})}})),n}},{key:"_tsDiagnosticCategoryToMarkerSeverity",value:function(e){switch(e){case 1:return f.MarkerSeverity.Error;case 3:return f.MarkerSeverity.Info;case 0:return f.MarkerSeverity.Warning;case 2:return f.MarkerSeverity.Hint}return f.MarkerSeverity.Info}}]),n}(P),K=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"triggerCharacters",get:function(){return["."]}},{key:"provideCompletionItems",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function n(){var i,a,u,c,l,d,p;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.getWordUntilPosition(r),a=new f.Range(r.lineNumber,i.startColumn,r.lineNumber,i.endColumn),u=t.uri,c=t.getOffsetAt(r),e.next=6,o._worker(u);case 6:if(l=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,l.getCompletionsAtPosition(u.toString(),c);case 11:if((d=e.sent)&&!t.isDisposed()){e.next=14;break}return e.abrupt("return");case 14:return p=d.entries.map((function(e){var n,i=a;if(e.replacementSpan){var s=t.getPositionAt(e.replacementSpan.start),o=t.getPositionAt(e.replacementSpan.start+e.replacementSpan.length);i=new f.Range(s.lineNumber,s.column,o.lineNumber,o.column)}var l=[];return-1!==(null===(n=e.kindModifiers)||void 0===n?void 0:n.indexOf("deprecated"))&&l.push(f.languages.CompletionItemTag.Deprecated),{uri:u,position:r,offset:c,range:i,label:e.name,insertText:e.name,sortText:e.sortText,kind:K.convertKind(e.kind),tags:l}})),e.abrupt("return",{suggestions:p});case 16:case"end":return e.stop()}}),n)})))()}},{key:"resolveCompletionItem",value:function(t,r){var n=this;return a.asyncToGenerator(e(s).mark((function r(){var i,a,o,u,c,l;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(i=t).uri,o=i.position,u=i.offset,e.next=6,n._worker(a);case 6:return c=e.sent,e.next=9,c.getCompletionEntryDetails(a.toString(),u,i.label);case 9:if(l=e.sent){e.next=12;break}return e.abrupt("return",i);case 12:return e.abrupt("return",{uri:a,position:o,label:l.name,kind:K.convertKind(l.kind),detail:I(l.displayParts),documentation:{value:K.createDocumentationString(l)}});case 13:case"end":return e.stop()}}),r)})))()}}],[{key:"convertKind",value:function(e){switch(e){case U.primitiveType:case U.keyword:return f.languages.CompletionItemKind.Keyword;case U.variable:case U.localVariable:return f.languages.CompletionItemKind.Variable;case U.memberVariable:case U.memberGetAccessor:case U.memberSetAccessor:return f.languages.CompletionItemKind.Field;case U.function:case U.memberFunction:case U.constructSignature:case U.callSignature:case U.indexSignature:return f.languages.CompletionItemKind.Function;case U.enum:return f.languages.CompletionItemKind.Enum;case U.module:return f.languages.CompletionItemKind.Module;case U.class:return f.languages.CompletionItemKind.Class;case U.interface:return f.languages.CompletionItemKind.Interface;case U.warning:return f.languages.CompletionItemKind.File}return f.languages.CompletionItemKind.Property}},{key:"createDocumentationString",value:function(e){var t=I(e.documentation),r=!0,n=!1,i=void 0;if(e.tags)try{for(var a,s=e.tags[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var o=a.value;t+="\n\n".concat(H(o))}}catch(e){n=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}return t}}]),n}(P);function H(e){var t="*@".concat(e.name,"*");if("param"===e.name&&e.text){var r=a.toArray(e.text),n=r[0],i=r.slice(1);t+="`".concat(n.text,"`"),i.length>0&&(t+=" — ".concat(i.map((function(e){return e.text})).join(" ")))}else Array.isArray(e.text)?t+=" — ".concat(e.text.map((function(e){return e.text})).join(" ")):e.text&&(t+=" — ".concat(e.text));return t}var j=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){var e;return a.classCallCheck(this,n),(e=r.call.apply(r,[this].concat(Array.prototype.slice.call(arguments)))).signatureHelpTriggerCharacters=["(",","],e}return a.createClass(n,[{key:"provideSignatureHelp",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function n(){var a,u,c,l,d;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,u=t.getOffsetAt(r),e.next=4,o._worker(a);case 4:if(c=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,c.getSignatureHelpItems(a.toString(),u,{triggerReason:j._toSignatureHelpTriggerReason(i)});case 9:if((l=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return d={activeSignature:l.selectedItemIndex,activeParameter:l.argumentIndex,signatures:[]},l.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:I(e.documentation)},t.label+=I(e.prefixDisplayParts),e.parameters.forEach((function(r,n,i){var a=I(r.displayParts),s={label:a,documentation:{value:I(r.documentation)}};t.label+=a,t.parameters.push(s),n<i.length-1&&(t.label+=I(e.separatorDisplayParts))})),t.label+=I(e.suffixDisplayParts),d.signatures.push(t)})),e.abrupt("return",{value:d,dispose:function(){}});case 15:case"end":return e.stop()}}),n)})))()}}],[{key:"_toSignatureHelpTriggerReason",value:function(e){switch(e.triggerKind){case f.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case f.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case f.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}}]),n}(P),V=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideHover",value:function(t,r,n){var i=this;return a.asyncToGenerator(e(s).mark((function n(){var a,o,u,c,l,d,f;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(r),e.next=4,i._worker(a);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getQuickInfoAtPosition(a.toString(),o);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return l=I(c.documentation),d=c.tags?c.tags.map((function(e){return H(e)})).join("  \n\n"):"",f=I(c.displayParts),e.abrupt("return",{range:i._textSpanToRange(t,c.textSpan),contents:[{value:"```typescript\n"+f+"\n```\n"},{value:l+(d?"\n\n"+d:"")}]});case 16:case"end":return e.stop()}}),n)})))()}}]),n}(P),W=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideDocumentHighlights",value:function(t,r,n){var i=this;return a.asyncToGenerator(e(s).mark((function n(){var a,o,u,c;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(r),e.next=4,i._worker(a);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getOccurrencesAtPosition(a.toString(),o);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",c.map((function(e){return{range:i._textSpanToRange(t,e.textSpan),kind:e.isWriteAccess?f.languages.DocumentHighlightKind.Write:f.languages.DocumentHighlightKind.Text}})));case 13:case"end":return e.stop()}}),n)})))()}}]),n}(P),G=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(e,t){var i;return a.classCallCheck(this,n),(i=r.call(this,t))._libFiles=e,i}return a.createClass(n,[{key:"provideDefinition",value:function(t,r,n){var i=this;return a.asyncToGenerator(e(s).mark((function n(){var a,o,u,c,l,d,p,g,b,h,m,v;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,o=t.getOffsetAt(r),e.next=4,i._worker(a);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getDefinitionAtPosition(a.toString(),o);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,i._libFiles.fetchLibFilesIfNecessary(c.map((function(e){return f.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:for(l=[],d=!0,p=!1,g=void 0,e.prev=18,b=c[Symbol.iterator]();!(d=(h=b.next()).done);d=!0)m=h.value,(v=i._libFiles.getOrCreateModel(m.fileName))&&l.push({uri:v.uri,range:i._textSpanToRange(v,m.textSpan)});e.next=26;break;case 22:e.prev=22,e.t0=e.catch(18),p=!0,g=e.t0;case 26:e.prev=26,e.prev=27,d||null==b.return||b.return();case 29:if(e.prev=29,!p){e.next=32;break}throw g;case 32:return e.finish(29);case 33:return e.finish(26);case 34:return e.abrupt("return",l);case 35:case"end":return e.stop()}}),n,null,[[18,22,26,34],[27,,29,33]])})))()}}]),n}(P),J=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(e,t){var i;return a.classCallCheck(this,n),(i=r.call(this,t))._libFiles=e,i}return a.createClass(n,[{key:"provideReferences",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function n(){var i,a,u,c,l,d,p,g,b,h,m,v;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,a=t.getOffsetAt(r),e.next=4,o._worker(i);case 4:if(u=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,u.getReferencesAtPosition(i.toString(),a);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,o._libFiles.fetchLibFilesIfNecessary(c.map((function(e){return f.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:for(l=[],d=!0,p=!1,g=void 0,e.prev=18,b=c[Symbol.iterator]();!(d=(h=b.next()).done);d=!0)m=h.value,(v=o._libFiles.getOrCreateModel(m.fileName))&&l.push({uri:v.uri,range:o._textSpanToRange(v,m.textSpan)});e.next=26;break;case 22:e.prev=22,e.t0=e.catch(18),p=!0,g=e.t0;case 26:e.prev=26,e.prev=27,d||null==b.return||b.return();case 29:if(e.prev=29,!p){e.next=32;break}throw g;case 32:return e.finish(29);case 33:return e.finish(26);case 34:return e.abrupt("return",l);case 35:case"end":return e.stop()}}),n,null,[[18,22,26,34],[27,,29,33]])})))()}}]),n}(P),B=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideDocumentSymbols",value:function(t,r){var n=this;return a.asyncToGenerator(e(s).mark((function r(){var i,a,o,u,c;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,e.next=3,n._worker(i);case 3:if(a=e.sent,!t.isDisposed()){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,a.getNavigationBarItems(i.toString());case 8:if((o=e.sent)&&!t.isDisposed()){e.next=11;break}return e.abrupt("return");case 11:return u=function(e,r,i){var a={name:r.text,detail:"",kind:z[r.kind]||f.languages.SymbolKind.Variable,range:n._textSpanToRange(t,r.spans[0]),selectionRange:n._textSpanToRange(t,r.spans[0]),tags:[]};i&&(a.containerName=i);var s=!0,o=!1,c=void 0;if(r.childItems&&r.childItems.length>0)try{for(var l,d=r.childItems[Symbol.iterator]();!(s=(l=d.next()).done);s=!0){var p=l.value;u(e,p,a.name)}}catch(e){o=!0,c=e}finally{try{s||null==d.return||d.return()}finally{if(o)throw c}}e.push(a)},c=[],o.forEach((function(e){return u(c,e)})),e.abrupt("return",c);case 15:case"end":return e.stop()}}),r)})))()}}]),n}(P),U=function e(){"use strict";a.classCallCheck(this,e)};U.unknown="",U.keyword="keyword",U.script="script",U.module="module",U.class="class",U.interface="interface",U.type="type",U.enum="enum",U.variable="var",U.localVariable="local var",U.function="function",U.localFunction="local function",U.memberFunction="method",U.memberGetAccessor="getter",U.memberSetAccessor="setter",U.memberVariable="property",U.constructorImplementation="constructor",U.callSignature="call",U.indexSignature="index",U.constructSignature="construct",U.parameter="parameter",U.typeParameter="type parameter",U.primitiveType="primitive type",U.label="label",U.alias="alias",U.const="const",U.let="let",U.warning="warning";var z=Object.create(null);z[U.module]=f.languages.SymbolKind.Module,z[U.class]=f.languages.SymbolKind.Class,z[U.enum]=f.languages.SymbolKind.Enum,z[U.interface]=f.languages.SymbolKind.Interface,z[U.memberFunction]=f.languages.SymbolKind.Method,z[U.memberVariable]=f.languages.SymbolKind.Property,z[U.memberGetAccessor]=f.languages.SymbolKind.Property,z[U.memberSetAccessor]=f.languages.SymbolKind.Property,z[U.variable]=f.languages.SymbolKind.Variable,z[U.const]=f.languages.SymbolKind.Variable,z[U.localVariable]=f.languages.SymbolKind.Variable,z[U.variable]=f.languages.SymbolKind.Variable,z[U.function]=f.languages.SymbolKind.Function,z[U.localFunction]=f.languages.SymbolKind.Function;var X,q,Y=function(e){"use strict";a.inherits(r,e);var t=a.createSuper(r);function r(){return a.classCallCheck(this,r),t.apply(this,arguments)}return a.createClass(r,[{key:"_convertTextChanges",value:function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}}],[{key:"_convertOptions",value:function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}}]),r}(P),Q=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideDocumentRangeFormattingEdits",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function i(){var a,u,c,l,d;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,u=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),c=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=5,o._worker(a);case 5:if(l=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,l.getFormattingEditsForRange(a.toString(),u,c,Y._convertOptions(n));case 10:if((d=e.sent)&&!t.isDisposed()){e.next=13;break}return e.abrupt("return");case 13:return e.abrupt("return",d.map((function(e){return o._convertTextChanges(t,e)})));case 14:case"end":return e.stop()}}),i)})))()}}]),n}(Y),Z=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"autoFormatTriggerCharacters",get:function(){return[";","}","\n"]}},{key:"provideOnTypeFormattingEdits",value:function(t,r,n,i,o){var u=this;return a.asyncToGenerator(e(s).mark((function a(){var o,c,l,d;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.uri,c=t.getOffsetAt(r),e.next=4,u._worker(o);case 4:if(l=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,l.getFormattingEditsAfterKeystroke(o.toString(),c,n,Y._convertOptions(i));case 9:if((d=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",d.map((function(e){return u._convertTextChanges(t,e)})));case 13:case"end":return e.stop()}}),a)})))()}}]),n}(Y),$=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideCodeActions",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function i(){var a,u,c,l,d,f,p,g;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,u=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),c=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),l=Y._convertOptions(t.getOptions()),d=n.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),e.next=7,o._worker(a);case 7:if(f=e.sent,!t.isDisposed()){e.next=10;break}return e.abrupt("return");case 10:return e.next=12,f.getCodeFixesAtPosition(a.toString(),u,c,d,l);case 12:if((p=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return",{actions:[],dispose:function(){}});case 15:return g=p.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(e){return o._tsCodeFixActionToMonacoCodeAction(t,n,e)})),e.abrupt("return",{actions:g,dispose:function(){}});case 17:case"end":return e.stop()}}),i)})))()}},{key:"_tsCodeFixActionToMonacoCodeAction",value:function(e,t,r){var n=[],i=!0,a=!1,s=void 0,o=!0,u=!1,c=void 0;try{for(var l,d=r.changes[Symbol.iterator]();!(o=(l=d.next()).done);o=!0){var f=l.value;try{for(var p,g=f.textChanges[Symbol.iterator]();!(i=(p=g.next()).done);i=!0){var b=p.value;n.push({resource:e.uri,edit:{range:this._textSpanToRange(e,b.span),text:b.newText}})}}catch(e){a=!0,s=e}finally{try{i||null==g.return||g.return()}finally{if(a)throw s}}}}catch(e){u=!0,c=e}finally{try{o||null==d.return||d.return()}finally{if(u)throw c}}return{title:r.description,edit:{edits:n},diagnostics:t.markers,kind:"quickfix"}}}]),n}(Y),ee=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(e,t){var i;return a.classCallCheck(this,n),(i=r.call(this,t))._libFiles=e,i}return a.createClass(n,[{key:"provideRenameEdits",value:function(t,r,n,i){var o=this;return a.asyncToGenerator(e(s).mark((function i(){var a,u,c,l,d,f,p,g,b,h,m,v,y,k;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,u=a.toString(),c=t.getOffsetAt(r),e.next=5,o._worker(a);case 5:if(l=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,l.getRenameInfo(u,c,{allowRenameOfImportPath:!1});case 10:if(!1!==(d=e.sent).canRename){e.next=13;break}return e.abrupt("return",{edits:[],rejectReason:d.localizedErrorMessage});case 13:if(void 0===d.fileToRename){e.next=15;break}throw new Error("Renaming files is not supported.");case 15:return e.next=17,l.findRenameLocations(u,c,!1,!1,!1);case 17:if((f=e.sent)&&!t.isDisposed()){e.next=20;break}return e.abrupt("return");case 20:p=[],g=!0,b=!1,h=void 0,e.prev=22,m=f[Symbol.iterator]();case 24:if(g=(v=m.next()).done){e.next=35;break}if(y=v.value,!(k=o._libFiles.getOrCreateModel(y.fileName))){e.next=31;break}p.push({resource:k.uri,edit:{range:o._textSpanToRange(k,y.textSpan),text:n}}),e.next=32;break;case 31:throw new Error("Unknown file ".concat(y.fileName,"."));case 32:g=!0,e.next=24;break;case 35:e.next=41;break;case 37:e.prev=37,e.t0=e.catch(22),b=!0,h=e.t0;case 41:e.prev=41,e.prev=42,g||null==m.return||m.return();case 44:if(e.prev=44,!b){e.next=47;break}throw h;case 47:return e.finish(44);case 48:return e.finish(41);case 49:return e.abrupt("return",{edits:p});case 50:case"end":return e.stop()}}),i,null,[[22,37,41,49],[42,,44,48]])})))()}}]),n}(P),te=function(t){"use strict";a.inherits(n,t);var r=a.createSuper(n);function n(){return a.classCallCheck(this,n),r.apply(this,arguments)}return a.createClass(n,[{key:"provideInlayHints",value:function(t,r,n){var i=this;return a.asyncToGenerator(e(s).mark((function n(){var o,u,c,l,d,f;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.uri,u=o.toString(),c=t.getOffsetAt({lineNumber:r.startLineNumber,column:r.startColumn}),l=t.getOffsetAt({lineNumber:r.endLineNumber,column:r.endColumn}),e.next=6,i._worker(o);case 6:if(d=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return",[]);case 9:return e.next=11,d.provideInlayHints(u,c,l);case 11:return f=e.sent,e.abrupt("return",f.map((function(e){return a.objectSpread({},e,{position:t.getPositionAt(e.position),kind:i._convertHintKind(e.kind)})})));case 13:case"end":return e.stop()}}),n)})))()}},{key:"_convertHintKind",value:function(e){switch(e){case"Parameter":return f.languages.InlayHintKind.Parameter;case"Type":return f.languages.InlayHintKind.Type;default:return f.languages.InlayHintKind.Other}}}]),n}(P);function re(e){q=se(e,"typescript")}function ne(e){X=se(e,"javascript")}function ie(){return new Promise((function(e,t){if(!X)return t("JavaScript not registered!");e(X)}))}function ae(){return new Promise((function(e,t){if(!q)return t("TypeScript not registered!");e(q)}))}function se(e,t){var r=new _(t,e),n=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i;return(i=r).getLanguageServiceWorker.apply(i,a.toConsumableArray(t))},i=new M(n);return f.languages.registerCompletionItemProvider(t,new K(n)),f.languages.registerSignatureHelpProvider(t,new j(n)),f.languages.registerHoverProvider(t,new V(n)),f.languages.registerDocumentHighlightProvider(t,new W(n)),f.languages.registerDefinitionProvider(t,new G(i,n)),f.languages.registerReferenceProvider(t,new J(i,n)),f.languages.registerDocumentSymbolProvider(t,new B(n)),f.languages.registerDocumentRangeFormattingEditProvider(t,new Q(n)),f.languages.registerOnTypeFormattingEditProvider(t,new Z(n)),f.languages.registerCodeActionProvider(t,new $(n)),f.languages.registerRenameProvider(t,new ee(i,n)),f.languages.registerInlayHintsProvider(t,new te(n)),new R(i,e,t,n),n}}))}();
//# sourceMappingURL=tsMode.923f70c5.js.map