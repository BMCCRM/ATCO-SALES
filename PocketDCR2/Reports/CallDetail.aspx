<%@ Page Title="Spot Check" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="CallDetail.aspx.cs" Inherits="PocketDCR2.Reports.CallDetail1" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../assets/js/jquery.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <script src="CallDetail.js" type="text/javascript"></script>
    
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>

    <%--<script type="text/javascript" src="../assets/js/gmap.js"></script>--%>
    <%--<link href="../Scripts/jquery.dataTables.min.css" rel="stylesheet" />--%>

    <link href="../CSS/styles.css" type="text/css" rel="Stylesheet" />

    <style type="text/css">

        table.dataTable tr.odd {
             background-color: #e4e4e4;

        } 
        table.dataTable tr.even { 
            background-color: white;

        }

        table.dataTable thead {
            white-space: nowrap;
        }

        table.dataTable thead .sorting_asc {
          background: url(../Images/sort_asc.png) no-repeat center right;

        }
        table.dataTable thead .sorting_desc {
          background: url(../Images/sort_desc.png) no-repeat center right;
        }
        table.dataTable thead .sorting {
          background: url(../Images/sort_both.png) no-repeat center right;
        }

        #raw {
            width: 100%;
            height: 100%;
            top: 0;
            position: absolute;
            visibility: hidden;
            display: none;
            z-index: 999;
            background-color: rgba(22,22,22,0.5); /* complimenting your modal colors */
            /*visibility: visible;
            display: block;*/
        }

            #raw:target {
                visibility: visible;
                display: block;
            }

        #map {
            position: relative;
            margin: 0 auto;
            top: 25%;
            box-shadow: 0 0 20px #999;
        }

        #ddlvisit {
            width: 216px;
        }

        #ddlMedRepZsm {
            width: 216px;
        }

        #ddlbrand {
            width: 216px;
        }

        .dateandrep {
            margin-left: 20px;
        }

        .viewbtn {
            background: #4ba6e3;
            background-image: -webkit-linear-gradient(top, #4ba6e3, #23597a);
            background-image: -moz-linear-gradient(top, #4ba6e3, #23597a);
            background-image: -ms-linear-gradient(top, #4ba6e3, #23597a);
            background-image: -o-linear-gradient(top, #4ba6e3, #23597a);
            background-image: linear-gradient(to bottom, #4ba6e3, #23597a);
            -webkit-border-radius: 8;
            -moz-border-radius: 8;
            border-radius: 8px;
            font-family: Georgia;
            color: #ffffff;
            font-size: 12px;
            padding: 9px 20px 9px 21px;
            text-decoration: none;
        }

            .viewbtn:hover {
                background: #3cb0fd;
                background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
                background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
                background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
                background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
                background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
                text-decoration: none;
            }

        .styled-select {
            background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
            height: 29px;
            overflow: hidden;
            width: 240px;
        }

            .styled-select select {
                background: transparent;
                border: none;
                font-size: 14px;
                height: 29px;
                padding: 5px; /* If you add too much padding here, the options won't show in IE */
                width: 268px;
            }

        .semi-square {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }

        .blue {
            background-color: whitesmoke;
        }

            .blue select {
                color: black;
            }

        .buttonn {
            border: none;
            display: inline-block;
            border-radius: 4px;
            font-size: 15px;
            padding: 8px 20px 8px 20px;
            border-radius: 6px;
            cursor: pointer;
            background: url(../assets/img/Maps-Location-icon.png) 8px 10px no-repeat;
            background-color: whitesmoke;
            text-decoration: none;
            color: black;
            /*background-repeat:no-repeat;*/
            /*background-position :;*/
        }

            .buttonn:hover {
                background: url(../assets/img/white-map.png) 8px 10px no-repeat;
                background-color: black;
                color: white;
            }

        .btnsaless {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: whitesmoke;
			margin-bottom:10px;
        }

            .btnsaless:hover {
                background-color: black;
                color: white;
            }

        .headerr .wrap {
            width: 150px;
            margin: auto;
            margin-top: 10px;
            text-align: center;
            position: relative;
        }

        .wrap {
            margin: 0 auto;
            width: 80%;
            margin-top: 10px;
        }

        .parent {
            margin-bottom: 15px;
            padding: 10px;
            color: #0A416B;
            clear: both;
        }

        .left {
            float: left;
            width: 38%;
            padding: 5px;
        }

        .center {
            float: left;
            width: 45%;
            padding: 5px;
        }

        .right {
            float: left;
            width: 10%;
            padding: 5px;
        }

        
.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.buttton {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06D85F;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.buttton:hover {
  background: #06D85F;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 50%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}
        .dataTables_filter  {
           
        }
        .dataTables_length {
            display: none;
        }
    </style>

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static"
        Style="display: none;" />
    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    <div id="divConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure to delete this record(s)?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnYes" name="btnYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnNo" name="btnNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="Divmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnOk" name="btnOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="slmid" />
    <div class="headerr" style="padding: 10px;">
    </div>

    <div class="wrap" style="display: inline;">
        <div class="parent">
            <div class="left">
                <div style="width: 30%; height: 300px; float: left; background-color: silver">
                    <div class="wrap">
                       <div id="imagediv">
                                <img src="../assets/img/asd.jpg"  width="100%" height="100%; " />
                        </div>
                        <div style="margin-top:5px;"></div>
                         <label id="medrep" style="font-size: 15px;font-family: sans-serif; font-weight: lighter"></label>
                    
                    </div>
                    
                </div>
                <div style="width: 60%; float: left; margin-left: 10px">
                    <div class="wrap">
                        <h1 id="medrepname">Representative Details</h1>
                    </div>
                    <br />
                    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a style="font-size: 15px; font-family: sans-serif; font-weight: bold; font-size:20px; text-decoration: none" id="desig"></a>
                    </h1>
                    <br />
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Call :  <a style="font-size: 15px; font-family: sans-serif; font-weight: lighter; text-decoration: none" id="num"></a>
                    </h3>
                    <br />
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date :
                <label id="putdate" style="font-size: 15px; font-family: sans-serif; font-weight: lighter"></label>
                    </h3>

                    <br />
                   <a href="#popup2" class="btnsaless" onclick="dayview()" id="btndayview" >Day's Plan</a>
                       <a href="#popup2" class="btnsaless" onclick="dailycall()" id="btndailycall" >Daily Call Report</a>
					   <br/>
                       <a href="#popup2" class="btnsaless" onclick="caochingcalls()" id="btncoachingcalls" >Coaching Calls</a>
					   <br/>
                           <a href="#popup2" class="btnsaless" onclick="getbricksformedreps()" id="btnBricks" >Bricks</a>
                         <a href="#popup2" class="btnsaless" onclick="FillMapWithLocation()" id="btngoogleroute" >Google Route</a>
                     <%--<input type="button" class="btnsaless" id="btndayview" name="btndayview" value="Day View"  />--%>
                    <br />
                    <br />
                    <h3>Last DR/Chemist Visited : 
                <label id="lastdoc" style="font-size: 15px; font-family: sans-serif; font-weight: lighter"></label>
                    </h3>

                    <br />
                    <h3>Next DR Visited : 
                <label id="nextdoc" style="font-size: 15px; font-family: sans-serif; font-weight: lighter"></label>
                    </h3>
                </div>
            </div>
            <div class="center">

                <div id="mapppp" style="height: 300px; width: 100%;">
                </div>
            </div>
        </div>
        <%--<div class="right" style="margin-left: 20px">
            <div class="wrap">
                <h1>Spot Check</h1>
            </div>
            <%--  <br />
            <h3>Location Per Plan :</h3>
            <div class="styled-select blue semi-square">

                <select id="ddllocation">
                    <option value="-1">Select Location per Plan</option>
                    <option value="Yes">Yes</option>
                    <option value="NO">No</option>
                </select>

            </div>
            <br />
            <h3>Join Visit :</h3>
            <div class="styled-select blue semi-square">

                <select id="ddljv">
                    <option value="-1">Select Join Visit</option>
                    <option value="Yes">Yes</option>
                    <option value="NO">No</option>
                </select>
            </div>--%>
            <%--<br />
            <div style="margin-left: 10px">
                <a href="#popup1">
                <img src="../assets/img/icon01.jpg" style="cursor: pointer" /></a>
                <br />
                <a id="btnsales" > 
                <img src="../assets/img/icon02.jpg" style="cursor: pointer" /> </a>
            </div>
        </div>--%>
    </div>

    <div id="popup1" style="z-index:999" class="overlay">
        <div class="popup">
            <h2>Spot Check</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
                <h3>Location As Per Plan :</h3>
            <div class="styled-select blue semi-square">

                <select id="ddllocation">
                    <option value="-1">Select Location per Plan</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

            </div>
            <br />
            <h3>Joint Visit :</h3>
            <div class="styled-select blue semi-square">

                <select id="ddljv">
                    <option value="-1">Select Joint Visit</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            </div>
            <br />
             <input type="button" class="btnsaless" id="btnSave" name="btnSave" value="Submit" />

        </div>
    </div>
     <div style="display: block;" id="employees">
                 <div class="regional1hierarchy">
                     <div style="display: block;" class="row" id="MIODetails">
                     </div>
                 </div>
             </div>
     
    <div id="popup2" style="z-index:999" class="overlay">
        <div class="popup">
            <h2 id="popuptitle"></h2>
            <a class="close" href="#">&times;</a>
            <br />
            <div class="content" id="daydetail">
            
            </div>
        </div>
    </div>

    <div class="wrapper-inner">

    </div>
     <a href="#popupp1" id="asd"></a>

</asp:Content>

