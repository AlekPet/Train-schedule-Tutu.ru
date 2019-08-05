// ==UserScript==
// @name        Train schedule Tutu.ru
// @name:ru         Расписание Tutu.ru
// @namespace    https://github.com/AlekPet/
// @version      0.1
// @description  Copy Train schedule!
// @description:ru  Копируем расписание!
// @author       AlekPet
// @match        https://www.tutu.ru/rasp.php*
// @icon        https://cdn1.tu-tu.ru/images2/bemp/svg/logo/2018/logo_tutu_final.svg
// @run-at document-end
// @grant GM_addStyle
// @require https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("\
.BoxTutu{position: fixed;top: 30%;left: 10px;max-width: 170px;border: 3px dotted #ff6200;padding: 10px;background: #ffe26da3;}\
.BoxTutu #raspis{border: 2px dotted blue;margin: 5px;padding: 5px;background: #ffffffc4;    color: #f53349; font: bold 1em monospace;overflow-y: auto; max-height: 300px;}\
#raspis::-webkit-scrollbar {width: 12px; margin-left: 20px; float: left;}\
#raspis::-webkit-scrollbar-thumb {    background-color: #55ffed;    background-clip: padding-box;}\
#raspis::-webkit-scrollbar-track {    background-color: #ffee55;    border-left: 1px solid #ccc;}\
")

    function get(){
        let data, $raspis;
        if(!$("#raspis").length){
            let $divBox = $("<div  class='BoxTutu'>"),
                $div = $("<div style='font: bold 0.8em monospace;text-align:center;'>").html($(".t-ttl").text().replace(/(\d+.*\d+)/,"<span style='color:blue'>$1</span>")+"\n"),
                $chb = $("<input type='checkbox' id='chb'>").change(get);
            $raspis = $("<div contenteditable='true' id='raspis'>");
            data = "";
            $divBox.append($div,$raspis,$("<div style='text-align:center;'>").append($("<span style='font-size:0.7em;'>Ласточку не показывать </span>").append($chb)));
            $divBox.appendTo($("body"));
        } else {
            data ="";
            $raspis = $("#raspis");
            $raspis.empty();
        }

        let $chb = $("#chb").is(':checked');

        $("tr[class^='desktop__card']").each(function(){
            $(this).find("td:eq(0) a").each(function(indx,el){
                if($(this).next().children().length && !['Стандарт плюс'].includes($(this).next().text()) && $chb) return false;

                let styleSet = {color:'#39ffae',bg:'blue',font:'bold 0.6em monospace',border:'2px solid #00ebff',pad:'2px'};

                switch($(this).next().text()){
                    case "Стандарт плюс":
                        styleSet.color = '#ffffff';
                        styleSet.bg = '#af0dcb';
                        styleSet.border = '2px solid #790b7d';
                        styleSet.pad = '1px';
                        break;
                }

                let lastochka = $(this).next().children().length?" <span style='color: "+styleSet.color+";background: "+styleSet.bg+";padding: "+styleSet.pad+";font:"+styleSet.font+";text-transform: uppercase;border: "+styleSet.border+";'>"+$(this).next().text()+"</span>" : "";
                data+=this.innerText+lastochka+"<br>";
            })
        })
        $raspis.html(data);
    }
    get();
})();
