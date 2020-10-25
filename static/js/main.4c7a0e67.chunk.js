(this["webpackJsonptext-data-upload"]=this["webpackJsonptext-data-upload"]||[]).push([[0],{12:function(e,t,a){},33:function(e,t,a){e.exports=a(46)},38:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(25),r=a.n(s),i=a(28),c=(a(38),a(30)),o=a(31),d=a(9),u=a(8),m=a(14),p=a(15),f=a(10),g=a(32),h=a(29),E=a(50),v=a(48),b=a(26),y=a(51),C=a(47);a(12);function _(e){return e.convertingFile?l.a.createElement("div",null,l.a.createElement(C.a,{animation:"border",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading..."))):l.a.createElement("div",null,l.a.createElement("h6",null,"Upload your dataset to this page and click next."),l.a.createElement("form",{method:"post",action:"#",id:"#"},l.a.createElement("div",{className:"form-group files"},l.a.createElement("input",{type:"file",className:"form-control fc-custom",multiple:"",onChange:e.onChangeHandler})),l.a.createElement("span",{className:"text-muted"},"*supports .csv, .tsv, .xlsx and .xls file types.")))}var H=a(49);function x(e){function t(e){for(var t=[],a=0;a<e.length;a++)t.push(l.a.createElement("option",{key:a,value:a},e[a]));return t}return l.a.createElement("div",{style:{overflow:"auto",maxHeight:"100%"}},l.a.createElement("div",{className:"exclude-columns"},l.a.createElement("h6",null,"Exclude columns by untoggling the checkbox."),l.a.createElement("div",{className:"headers-column"},l.a.createElement(v.a,null,function(t){for(var a=[],n=0;n<t.length;n++)a.push(l.a.createElement(b.a,{lg:4,key:n},l.a.createElement(H.a.Group,{controlId:n,key:n},l.a.createElement(H.a.Check,{type:"checkbox",label:t[n],defaultChecked:!0,onChange:e.onChangeCheckbox}))));return a}(e.tableHeaders)))),l.a.createElement("div",null,l.a.createElement("h6",null,"Choose included columns to uniquely assign to ",l.a.createElement("b",null,"ID, Name,")," and ",l.a.createElement("b",null,"Timestamp.")),l.a.createElement("div",{className:"headers-column"},l.a.createElement("div",{className:"list-form-input"},l.a.createElement(H.a.Label,null,l.a.createElement("b",null,"ID")),l.a.createElement(H.a.Control,{className:"fc-custom2",as:"select",defaultValue:null,onChange:e.onChangeList},l.a.createElement("option",{key:"selectVal",value:"-1"},"Select Value"),t(e.availableHeaders))),l.a.createElement("div",{className:"list-form-input"},l.a.createElement(H.a.Label,null,l.a.createElement("b",null,"Name")),l.a.createElement(H.a.Control,{className:"fc-custom2",as:"select",defaultValue:null,onChange:e.onChangeList},l.a.createElement("option",{key:"selectVal",value:"-1"},"Select Value"),t(e.availableHeaders))),l.a.createElement("div",{className:"list-form-input"},l.a.createElement(H.a.Label,null,l.a.createElement("b",null,"Timestamp")),l.a.createElement(H.a.Control,{className:"fc-custom2",as:"select",defaultValue:null,onChange:e.onChangeList},l.a.createElement("option",{key:"selectVal",value:"-1"},"Select Value"),t(e.availableHeaders))))))}function k(e){function t(e,t){for(var a=[],n=0;n<e.length;n++)a.push(l.a.createElement(b.a,{key:n,lg:t?4:3},e[n]));return a}return l.a.createElement("div",{style:{overflow:"auto",maxHeight:"100%"}},l.a.createElement("div",{className:"exclude-columns"},l.a.createElement("h6",null,"Included Columns:"),l.a.createElement("div",{className:"headers-column"},l.a.createElement(v.a,null,function(e){for(var t=[],a=0;a<e.length;a++)t.push(l.a.createElement(b.a,{lg:4,key:a},l.a.createElement("span",null,e[a])));return t}(e.selectedHeaders)))),l.a.createElement("div",null,l.a.createElement("h6",null,"ID, Name, and Timestamp assignment:"),l.a.createElement("div",{className:"headers-column"},l.a.createElement("div",{className:"list-form-input"},l.a.createElement(v.a,null,l.a.createElement(b.a,{lg:3},l.a.createElement("h6",null,l.a.createElement("b",null,"ID:"))),l.a.createElement(b.a,null,e.assignedInfo.id))),l.a.createElement("div",{className:"list-form-input"},l.a.createElement(v.a,null,l.a.createElement(b.a,{lg:3},l.a.createElement("h6",null,l.a.createElement("b",null,"Name:"))),l.a.createElement(b.a,null,e.assignedInfo.name))),l.a.createElement("div",{className:"list-form-input"},l.a.createElement(v.a,null,l.a.createElement(b.a,{lg:3},l.a.createElement("h6",null,l.a.createElement("b",null,"Timestamp:"))),l.a.createElement(b.a,null,e.assignedInfo.timestamp))))),function(a){if(a)return e.fileUrl?l.a.createElement("div",{className:"response-info"},l.a.createElement("h6",null,l.a.createElement("b",null,"Your dataset was succesfully imported to our system.")," You can upload another dataset if you'd like to."),l.a.createElement("br",null),l.a.createElement("b",null,l.a.createElement("a",{href:e.fileUrl},"Download the imported dataset.")),l.a.createElement("br",null),l.a.createElement("i",null,l.a.createElement("b",null,l.a.createElement("a",{href:"http://calm-ocean-20734.herokuapp.com/text_data_files/",target:"_blank",rel:"noopener noreferrer"},"See index page for all imported files.")))):l.a.createElement("div",{className:"response-info"},l.a.createElement("h6",null,"We couldn't import your file because there ",function(e){switch(e){case 0:return l.a.createElement("u",null,"were duplicate id's and non-convertible timestamps.");case 1:return l.a.createElement("u",null,"were duplicate id's.");case 2:return l.a.createElement("u",null,"were non-convertible timestamps.");default:return l.a.createElement("u",null,"were duplicate id's and non-convertible timestamps.")}}(e.errorType)),(n=e.errorLists).duplicate_id_list&&n.non_convertible_timestamp_id_list?l.a.createElement("div",null,l.a.createElement(v.a,null,l.a.createElement(b.a,null,"Duplicate ID's:",l.a.createElement(v.a,null,t(n.duplicate_id_list,!0))),l.a.createElement(b.a,null,"ID's of the non-convertible timestamps:",l.a.createElement(v.a,null,t(n.non_convertible_timestamp_id_list,!0))))):n.duplicate_id_list?l.a.createElement("div",null,"Duplicate ID's:",l.a.createElement(v.a,null,t(n.duplicate_id_list,!1))):l.a.createElement("div",null,"ID's of the non-convertible timestamps:",l.a.createElement(v.a,null,t(n.non_convertible_timestamp_id_list,!1))));var n}(e.loadResponseInfo))}function w(e){var t=e.activatedStep;return l.a.createElement("div",{className:"myProgress"},l.a.createElement("div",{className:"myBar"},l.a.createElement("div",{className:"step-container",style:{width:t>1?t>2?"100%":"50%":"0%"}},l.a.createElement("span",{className:1===t?"step-activated":"step-completed"},l.a.createElement("span",{className:"check-mark",style:{display:1===t?"none":"block"}},"\u2713")),l.a.createElement("span",{className:t<2?"step":2===t?"step-activated":"step-completed",style:{marginLeft:"50%"}},l.a.createElement("span",{className:"check-mark",style:{display:3===t?"block":"none"}},"\u2713")),l.a.createElement("span",{className:t>2?e.successfullyCompleted?"step-completed":"step-activated":"step",style:{marginLeft:"100%"}},l.a.createElement("span",{className:"check-mark",style:{display:e.successfullyCompleted?"block":"none"}},"\u2713")))),l.a.createElement("small",{className:"step-text"},"Upload Dataset"),l.a.createElement("small",{className:"step-text",style:{marginLeft:"50%"}},"Adjust Settings"),l.a.createElement("small",{className:"step-text",style:{marginLeft:"97%"}},"Confirm & Upload"))}var N=function(){function e(t){Object(m.a)(this,e),this.testURL="http://localhost:3000/text_data_files",this.prodURL="https://calm-ocean-20734.herokuapp.com/text_data_files",this.component=t}return Object(p.a)(e,[{key:"uploadFileToParse",value:function(e){var t=this;fetch(this.prodURL,{method:"POST",body:e}).then((function(e){return e.json()})).then((function(e){if(500!==e.status)if(e.error){var a=null,n=null;e.duplicate_id_list_length>0&&e.non_convertible_timestamp_id_list_length>0?(a=0,n={duplicate_id_list:e.duplicate_id_list,non_convertible_timestamp_id_list:e.non_convertible_timestamp_id_list}):e.duplicate_id_list_length>0?(a=1,n={duplicate_id_list:e.duplicate_id_list}):(a=2,n={non_convertible_timestamp_id_list:e.non_convertible_timestamp_id_list}),t.component.setState({errorType:a,errorLists:n},(function(){t.component.setState({loadResponseInfo:!0},(function(){t.component.setState({resultsLoading:!t.component.state.resultsLoading})}))}))}else t.component.setState({fileUrl:e.link},(function(){t.component.setState({loadResponseInfo:!0},(function(){t.component.setState({resultsLoading:!t.component.state.resultsLoading,successfullyCompleted:!0})}))}))})).catch((function(e){console.log(e)}))}}]),e}(),S=a(16),L=a.n(S),O=function(e){Object(g.a)(a,e);var t=Object(h.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).parseComplete=function(t,a){t.errors.length>0||e.setState({tableHeaders:t.data[0],excludedHeaders:t.data[0].map((function(e){return!0}))},(function(){this.setState({step:2},(function(){}))}))},e.onChangeHandler=function(t){"xlsx"===t.target.files[0].name.substr(-4)?window.parseExcelXLSX(t.target.files[0],Object(f.a)(e)):"xls"===t.target.files[0].name.substr(-3)?window.parseExcelXLS(t.target.files[0],Object(f.a)(e)):"csv"===t.target.files[0].name.substr(-3)||"tsv"===t.target.files[0].name.substr(-3)?e.setState({selectedFile:t.target.files[0]}):(window.alert("Our system doesn't support the file. Please convert it to one of the supported file type and then try again."),t.target.value="")},e.onChangeCheckbox=function(t){var a=e.state.excludedHeaders.slice();for(var n in a[t.target.id]=!a[t.target.id],e.state.assigned)e.state.assigned[n]===e.state.tableHeaders[t.target.id]&&function(){var a=e.availableHeaders().indexOf(e.state.tableHeaders[t.target.id]),l=e.state.assignedHeaders.filter((function(e){return parseInt(e)!==a})),s=0;switch(n){case"id":s=0;break;case"name":s=1;break;case"timestamp":s=2;break;default:s=0}document.getElementsByClassName("list-form-input")[s].children[1].value=-1,e.setState({assigned:Object(u.a)(Object(u.a)({},e.state.assigned),{},Object(d.a)({},n,null)),assignedHeaders:l})}();e.setState({excludedHeaders:a})},e.syncAssHeadersState=function(){var t=[];for(var a in e.state.assigned){var n=e.availableHeaders().indexOf(e.state.assigned[a]);n>-1&&t.push(n)}e.setState({assignedHeaders:Object(o.a)(new Set(t))})},e.onChangeList=function(t){var a=parseInt(t.target.value);if(a>-1){if(e.state.assignedHeaders.includes(a)){window.alert("You already assigned this column.");var n=e.availableHeaders().indexOf(e.state.assigned[t.target.parentElement.children[0].textContent.toLowerCase()]);return void(t.target.value=n)}e.state.assignedHeaders.push(a),e.setState({assigned:Object(u.a)(Object(u.a)({},e.state.assigned),{},Object(d.a)({},t.target.parentElement.firstElementChild.textContent.toLowerCase(),e.availableHeaders()[a]))},e.syncAssHeadersState)}else{var l=e.state.assigned[t.target.parentElement.firstElementChild.textContent.toLowerCase()],s=e.availableHeaders().indexOf(l),r=e.state.assignedHeaders.filter((function(e){return parseInt(e)!==s}));e.setState({assigned:Object(u.a)(Object(u.a)({},e.state.assigned),{},Object(d.a)({},t.target.parentElement.firstElementChild.textContent.toLowerCase(),null)),assignedHeaders:r})}},e.nextButtonHandler=function(t){switch(e.state.step){case 1:if(e.state.selectedFile){if(e.state.asString){for(var a=[],n=0,l=Object.entries(e.state.converted[0]);n<l.length;n++){var s=Object(c.a)(l[n],2),r=s[0];s[1];a.push(r)}e.setState({tableHeaders:a,excludedHeaders:a.map((function(e){return!0}))},(function(){this.setState({step:2},(function(){}))}))}else L.a.parse(e.state.selectedFile,e.config);e.setState({step:2})}else window.alert("Please select a file to move forward.");break;case 2:e.setState({step:3});break;case 3:if(e.state.errorType||e.state.successfullyCompleted)e.setState({step:1,selectedFile:null,tableHeaders:[],excludedHeaders:[],assignedHeaders:[],assigned:{id:null,name:null,timestamp:null},resultsLoading:!1,loadResponseInfo:!1,successfullyCompleted:!1,errorType:null,errorLists:null,convertingFile:!1,asString:!1,fileUrl:null,converted:null});else{e.setState({resultsLoading:!e.state.resultsLoading});var i=new FormData;i.append("file",e.state.selectedFile),i.append("table_headers",e.availableHeaders()),i.append("id",e.state.assigned.id),i.append("name",e.state.assigned.name),i.append("timestamp",e.state.assigned.timestamp),i.append("as_string",e.state.asString),e.uploadService.uploadFileToParse(i)}break;default:console.log(e.state.step)}},e.renderPageTitle=function(){switch(e.state.step){case 1:return"Upload Dataset";case 2:return"Adjust Settings";case 3:return"Confirm & Upload";default:console.log(e.state.step)}},e.availableHeaders=function(){return e.state.tableHeaders.filter((function(t,a){return!!e.state.excludedHeaders[a]}))},e.cancelUpload=function(t){e.setState({step:1,selectedFile:null,tableHeaders:[],excludedHeaders:[],assignedHeaders:[],assigned:{id:null,name:null,timestamp:null},resultsLoading:!1,loadResponseInfo:!1,successfullyCompleted:!1,errorType:null,errorLists:null,convertingFile:!1,asString:!1,fileUrl:null,converted:null})},e.renderContent=function(){switch(e.state.step){case 1:return l.a.createElement(_,{onChangeHandler:e.onChangeHandler,fileLoading:e.state.convertingFile});case 2:return l.a.createElement(x,{availableHeaders:e.availableHeaders(),tableHeaders:e.state.tableHeaders,onChangeCheckbox:e.onChangeCheckbox,onChangeList:e.onChangeList});case 3:return l.a.createElement(k,{selectedHeaders:e.availableHeaders(),assignedInfo:e.state.assigned,loadResponseInfo:e.state.loadResponseInfo,errorType:e.state.errorType,errorLists:e.state.errorLists,fileUrl:e.state.fileUrl});default:return l.a.createElement(_,{onChangeHandler:e.onChangeHandler})}},e.stepToProgress=function(){switch(e.state.step){case 1:return 0;case 2:return 50;case 3:return 100;default:return 0}},e.nextButtonEnabled=function(){switch(e.state.step){case 1:if(e.state.selectedFile)return!0;break;case 2:case 3:if(e.state.assigned.id&&e.state.assigned.name&&e.state.assigned.timestamp&&e.state.excludedHeaders.includes(!0))return!0;break;default:return!1}},e.state={step:1,selectedFile:null,tableHeaders:[],excludedHeaders:[],assignedHeaders:[],assigned:{id:null,name:null,timestamp:null},resultsLoading:!1,loadResponseInfo:!1,convertingFile:!1,asString:!1},e.uploadService=new N(Object(f.a)(e)),e.config={delimiter:"",newline:"",quoteChar:'"',escapeChar:'"',header:!1,transformHeader:void 0,dynamicTyping:!1,preview:1,encoding:"",worker:!1,comments:!1,step:void 0,complete:e.parseComplete,error:void 0,download:!1,downloadRequestHeaders:void 0,downloadRequestBody:void 0,skipEmptyLines:!1,chunk:void 0,chunkSize:void 0,fastMode:void 0,beforeFirstChunk:void 0,withCredentials:void 0,transform:void 0,delimitersToGuess:[",","\t","|",";",L.a.RECORD_SEP,L.a.UNIT_SEP]},e.unparseConfig={quotes:!1,quoteChar:'"',escapeChar:'"',delimiter:",",header:!0,newline:"\r\n",skipEmptyLines:!1,columns:null},e}return Object(p.a)(a,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(E.a,{className:"main-container"},l.a.createElement(E.a.Header,{as:"div"},l.a.createElement(v.a,null,l.a.createElement(b.a,{lg:4},l.a.createElement("h5",{className:"card-title"},this.renderPageTitle())),l.a.createElement(b.a,{lg:8},l.a.createElement(w,{activatedStep:this.state.step,successfullyCompleted:this.state.successfullyCompleted})))),l.a.createElement(E.a.Body,null,this.renderContent()),l.a.createElement(E.a.Footer,null,this.state.step>1&&!this.state.successfullyCompleted?l.a.createElement(y.a,{className:"cancel-button",variant:"secondary",onClick:this.cancelUpload},"Cancel"):null,this.state.resultsLoading?l.a.createElement(y.a,{className:"move-forward-button",variant:"primary",disabled:!0},l.a.createElement(C.a,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"}),l.a.createElement("span",{className:"sr-only"},"Loading...")):l.a.createElement(y.a,{className:"move-forward-button",variant:"primary",onClick:this.nextButtonHandler,disabled:!this.nextButtonEnabled()},3===this.state.step?this.state.errorType||this.state.successfullyCompleted?"Upload Another":"Upload":"Next"))),l.a.createElement("p",{className:"text-muted",style:{fontSize:"11px",textAlign:"center",width:"100%"}},"created by emirhan kaplan at 2020."))}}]),a}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(42);r.a.render(l.a.createElement(i.a,null,l.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.4c7a0e67.chunk.js.map