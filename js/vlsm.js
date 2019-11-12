function clear_form(){for(var e=document.getElementById("nets").innerHTML,t=1;t<=e;t++)document.getElementById("name"+t).value="Subnet "+t,document.getElementById("hosts"+t).value=""}function change_subnet_number(){document.getElementById("nets").innerHTML;var e=document.getElementById("input_num_of_subnets").value;if(e=e.replace(/^\s+|\s+$/g,""),isNaN(e))alert("Porfavor dame un valor entre 2 y 999");else if(e%1!=0)alert("Please enter a whole integer  - no decimals or commas, please");else if(999<e||e<2)alert("Porfavor ingresa un valor entre 2 y 999");else{paragraph="";for(var t=1;t<=e;t++){if(null!=document.getElementById("name"+t))var n=document.getElementById("name"+t).value,r=document.getElementById("hosts"+t).value;else{n="Subnet "+t;if(null!=document.getElementById("hosts"+t))r=document.getElementById("hosts"+t).value;else r=""}paragraph+="<input type='text'  class='form-control-ipv4-vlsm' id='name"+t+"' value='"+n+"'> <input type='text' class='form-control-ipv4-vlsm' id='hosts"+t+"' tabindex='"+t+"' value='"+r+"'><br>"}document.getElementById("nets").innerHTML=e,document.getElementById("subnet_pargraph").innerHTML=paragraph}}function vlsm(){var e=document.getElementById("input_network").value;if(validate(e=e.replace(/^\s+|\s+$/g,""))){document.getElementById("not_valid_ip").innerHTML="";for(var t=return_slash(e),n=find_hosts(t),r=return_ip(e),d=find_mask(t),s=find_net_add(r,d),a=(find_broadcast(find_wildcard(d),r),document.getElementById("nets").innerHTML),o=sum_hosts(a),i=ordered_hosts(a),l="<h5 align='center'><strong>la red "+s[0]+"."+s[1]+"."+s[2]+"."+s[3]+"/"+t+" has "+n+" hosts. Sus Subredes Necesitan "+o+" hosts.</strong></h5></br>",u="<table class='table table-responsive'><tr><td>Nombre</td><td>Hosts Necesrios</td><td>Hosts Validos</td><td>Host libres</td><td>Segmento de la red</td><td>Subfijo</td><td>Mascara</td><td>Rango de direcciones</td><td>Broadcast</td><td>Wildcard</td></tr>",m=s,c=0,f=0;f<i.length;f++){var _=find_slash(i[f][0]),h=find_mask(_),g=find_net_add(m,h),p=find_wildcard(h);c+=find_hosts(_)+2,u+="<tr><td>"+i[f][1]+"</td>",u+="<td>"+i[f][0]+"</td>",u+="<td>"+find_hosts(_)+"</td>",u+="<td>"+(find_hosts(_)-i[f][0])+"</td>",u+="<td>"+g[0]+"."+g[1]+"."+g[2]+"."+g[3]+"</td>",u+="<td>/"+_+"</td>",m=find_broadcast(p,g),u+="<td>"+h[0]+"."+h[1]+"."+h[2]+"."+h[3]+"</td>",u+="<td>"+g[0]+"."+g[1]+"."+g[2]+"."+(g[3]+1)+" - "+m[0]+"."+m[1]+"."+m[2]+"."+(m[3]-1)+"</td>",u+="<td>"+m[0]+"."+m[1]+"."+m[2]+"."+m[3]+"</td>",u+="<td>"+p[0]+"."+p[1]+"."+p[2]+"."+p[3]+"</td>",m=next_net_add(m)}u+="</table>",0!=o?(n+2<c&&(l+="<p align='center' class='warning_message'>Parece que esas subredes no encajan en esa red, pero aquí hay algo más que puede funcionar para usted</p><br>"),u="<h4 align='center' class='success_message'>Finalizado</h4></br>"+l+u,document.getElementById("ans").innerHTML=u):document.getElementById("not_valid_ip").innerHTML="<p align='center' class='error_message'>Porfavor indique el numero necesario de ho</p>"}else document.getElementById("not_valid_ip").innerHTML="<p align='center' class='error_message'>la red no es válida</p>"}function validate(e){return!!e.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([1-9]|[1-2][0-9]|3[0-2])$/)}function return_slash(e){return e.split("/")[1]}function return_ip(e){return e.split("/")[0].split(".")}function find_hosts(e){return Math.pow(2,32-e)-2}function find_mask(e){for(var t=new Array,n=0;n<4;n++)t[n]=0;return e<8?t[0]=256-Math.pow(2,32-(e+24)):e<16?(t[0]=255,t[1]=256-Math.pow(2,32-(e+16))):e<24?(t[0]=255,t[1]=255,t[2]=256-Math.pow(2,32-(e+8))):(t[0]=255,t[1]=255,t[2]=255,t[3]=256-Math.pow(2,32-e)),t}function find_net_add(e,t){for(var n=new Array,r=0;r<4;r++)n[r]=e[r]&t[r];return n}function find_wildcard(e){for(var t=new Array,n=0;n<4;n++)t[n]=255-e[n];return t}function find_broadcast(e,t){for(var n=new Array,r=0;r<4;r++)n[r]=e[r]|parseInt(t[r]);return n}function ordered_hosts(e){for(var t=new Array,n=0,r=1;r<=e;r++){var d="name"+r,s="hosts"+r;d=document.getElementById(d).value,1<=(s=document.getElementById(s).value)&&(t[n]=[s,d],n++)}return t.sort(function(e,t){return t[0]-e[0]}),t}function sum_hosts(e){for(var t=0,n=1;n<=e;n++){var r="hosts"+n;1<=(r=parseInt(document.getElementById(r).value))&&(t+=r)}return t}function next_net_add(e){return e[3]<255?e[3]++:e[2]<255?(e[3]=0,e[2]++):e[1]<255?(e[3]=0,e[2]=0,e[1]++):(e[3]=0,e[2]=0,e[1]=0,e[0]++),e}function find_slash(e){for(var t=2;t<33;t++)if(e<=Math.pow(2,t)-2)return 32-t;return"TOO BIG"}