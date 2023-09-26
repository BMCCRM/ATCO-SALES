<%@ Page Title="Sales Feedback" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="Salesfeedback.aspx.cs" Inherits="PocketDCR2.Reports.Salesfeedback" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../assets/js/jquery.js"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <link href="../CSS/styles.css" type="text/css" rel="Stylesheet" />
     <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <%--<link href="../assets/css/dataTables.bootstrap.min.css" rel="stylesheet" />--%>
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
    <%--<script src="../assets/js/dataTables.bootstrap.min.js"></script>--%>
    <script type="text/javascript" src="salesfeedback.js"> </script>
    <style type="text/css">
        .headerr .wrap {
            width: 200px;
            margin: 0 auto;
            margin-top: 10px;
            text-align: center;
            position: relative;
        }

            .headerr .wrap .img_1, .header .wrap .img_2 {
                border: 1px solid #0f0;
                position: absolute;
                height: 20px;
                width: 20px;
                top: 25px;
            }

            .headerr .wrap .img_1 {
                left: 0;
            }

            .headerr .wrap .img_2 {
                right: 0;
            }

        .styled-select {
            background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
            overflow: hidden;
            width: 240px;
        }

            .styled-select select {
                background: transparent;
                border: none;
                font-size: 14px;
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

        .wrap {
            width: 80%;
            margin: 0 auto;
            margin-top: 15px;
        }

        .parent {
            margin-bottom: 15px;
            padding: 10px;
            color: #0A416B;
            clear: both;
            width: 100%;
        }

        .left {
            float: left;
            width: 12%;
            padding: 5px;
            height: 360px;
        }

        .center {
            float: left;
            width: 65%;
            padding: 5px;
            height: 350px;
        }

        .right {
            float: left;
            width: 20%;
            padding: 5px;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
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
            background-color: white;
        }

            .btnsaless:hover {
                background-color: black;
                color: white;
            }

        textarea#styleid {
            color: #666;
            font-size: 14px;
            -moz-border-radius: 8px;
            -webkit-border-radius: 8px;
            margin: 5px 0px 10px 0px;
            padding: 10px;
            height: 75px;
            width: 250px;
            border: #999 1px solid;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
            transition: all 0.25s ease-in-out;
            -webkit-transition: all 0.25s ease-in-out;
            -moz-transition: all 0.25s ease-in-out;
            box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
        }

            textarea#styleid:focus {
                color: #000;
                outline: none;
                border: wheat 1px solid;
                font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            }

        .button-secondary {
            font-size: 15px;
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            background: #03429a;
            padding: 6px 20px 6px 20px;
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
            width: 90%;
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

        @media screen and (max-width: 700px) {
            .box {
                width: 70%;
            }

            .popup {
                width: 80%;
            }
        }

        .dataTables_filter {
            display: none;
        }

        .dataTables_length {
            display: none;
        }


        .dropdown {
  /*position: absolute;*/
  /*top:50%;*/
  transform: translateY(-50%);
  background: transparent url("http://i62.tinypic.com/15xvbd5.png") no-repeat scroll 96% 0px;
width: 240px;

}

a {
  color: #000;
}

.dropdown dd,
.dropdown dt {
  margin: 0px;
  padding: 0px;
}

.dropdown ul {
  margin: -1px 0 0 0;
}

.dropdown dd {
  position: relative;
}

.dropdown a,
.dropdown a:visited {
  color: #000;
  text-decoration: none;
  outline: none;
  font-size: 12px;
}

.dropdown dt a {
  display: block;
  padding: 8px 20px 5px 10px;
  min-height: 25px;
  line-height: 24px;
  overflow: hidden;
  border: 0;
  width: 240px;
}

.dropdown dt a span,
.multiSel span {
  cursor: pointer;
  display: inline-block;
  padding: 0 3px 2px 0;
}

.dropdown dd ul {
  background-color: #F5F5F5;
  border: 0;
  color: #000;
  display: none;
  left: 0px;
  padding: 2px 15px 2px 5px;
  position: absolute;
  top: 2px;
  width: 280px;
  list-style: none;
  /*height: 100px;*/
  overflow: auto;
}

.dropdown span.value {
  display: none;
}

.dropdown dd ul li a {
  padding: 5px;
  display: block;
}

.dropdown dd ul li a:hover {
  background-color: #fff;
}

    </style>
<!-- Table goes in the document BODY -->
 

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
        <div class="wrap">
            <h1>Sales Feedback</h1>
        </div>
    </div>

    <div class="parent">
        <div class="left" style="background-color: silver"">
           
                <div class="wrap">
                       <div id="imagediv">
                                <img src="../assets/img/asd.jpg" style="" width="100%" height="100%; " />
                        </div>
               
                <h3>Date :
                 <label id="txtdate" style="font-size: 15px; font-weight: bold; font-family: sans-serif;"></label>
                </h3>
                <br />
                <h3>Name : 
                <label id="txtrep" style="font-size: 15px; font-weight: bold; font-family: sans-serif;"></label>
                </h3>
             </div>
        </div>

        <div class="center">
          <%--   <div class="headerr" style="padding: 10px;">
        <div class="wrap">
            <h1>Sales Feedback</h1>
        </div>
    </div>--%>
           
      <div style="width:35%;float:left;">
              <div style="width:80%;">
              <h3 style="margin-bottom:10px; text-align:center;">Commitment Level-Sales</h3>
                  </div>
            <div class="styled-select blue semi-square" style="float: left; margin-right: 10px; margin-bottom: 40px;">
                <label for="ddStretchedTarget"></label>
                <select id="ddStretchedTarget" >
                   
                </select>
            </div>
                  <%--<label style="font-weight:bold;" >Engagement Strategy</label>--%>
           <div style="width:80%;">
              <h3  style="margin-bottom:10px; text-align:center; margin-top:10px;">Customer Channel Focus</h3>
                  </div>
           <div style="float: left; margin-right: 10px;">
                <%--<select id="ddCustomerChannelFocus" multiple="multiple" style="width:250px;height:130px">
                </select>--%>
               <dl id="CustomerChannelFocusMain" class="dropdown semi-square" style="float: left; margin-right: 10px; background-color: #F5F5F5;z-index: 1000;"> 
  
                    <dt>
                    <a href="#" id="CustomerChannelFocus">
                      <span class="hida" id="CustomerChannelFocustitle">Select Customer Channel Focus</span>    
                      <p class="multiSel" id="CustomerChannelFocusShow"></p>  
                    </a>
                    </dt>
  
                    <dd>
                        <div class="mutliSelect">
                            <ul  id="ddCustomerChannelFocus">
                               
                            </ul>
                        </div>
                    </dd>
                </dl>

            </div>
            
           </div>
             
           <div style="width:32%;;float:left;">
              <div style="width:80%; ">
              <h3 style="margin-bottom:10px; text-align:center;">Trade Activity</h3>
                  </div>
                  
               <dl id="tradeActivityMain" class="dropdown semi-square" style="float: left; margin-right: 10px; background-color: #F5F5F5;z-index: 1000;"> 
  
                    <dt>
                    <a href="#" id="tradeActivity">
                      <span class="hida" id="TradeActivitytitle">Select Trade Activity</span>    
                      <p class="multiSel" id="TradeActivityShow"></p>  
                    </a>
                    </dt>
  
                    <dd>
                        <div class="mutliSelect">
                            <ul  id="ddTradeActivity">
                               
                            </ul>
                        </div>
                    </dd>
                </dl>
               

                      <%--<label style="font-weight:bold;" >Trade Activity :</label>--%>
               <div style="width:80%;" id="ddlDocTitle">
              <h3  style="margin-bottom:10px; text-align:center; margin-top:10px;">Doctors</h3>
                  </div>
               <div  style="float: left; margin-right: 10px;" id="ddlDocArea">
                <%--<select id="ddlDoctors" multiple="multiple" style="width:250px;height:130px">
                </select>--%>
                   <dl id="DoctorsMain" class="dropdown semi-square" style="float: left; margin-right: 10px; background-color: #F5F5F5;z-index: 1;"> 
  
                    <dt>
                    <a href="#" id="Doctors">
                      <span class="hida" id="Doctorstitle">Select Trade Activity</span>    
                      <p class="multiSel" id="DoctorsShow"></p>  
                    </a>
                    </dt>
  
                    <dd>
                        <div class="mutliSelect">
                            <ul  id="ddlDoctors">
                               
                            </ul>
                        </div>
                    </dd>
                </dl>
            </div>
              
             </div>

            
             <div style="width:32%;float:left;">
                   <div style="width:80%; ">
              <h3 style="margin-bottom:10px; text-align:center;">Engagement Strategy</h3>
                  </div>
                 
                 <dl id="ddSellingSkillsFocusAreaMain" class="dropdown semi-square" style="float: left; margin-right: 10px; background-color: #F5F5F5;z-index: 1000;"> 
  
                    <dt>
                    <a href="#" id="ddSellingSkillsFocus">
                      <span class="hida" id="SellingSkillsFocusAreatitle">Select Engagement Strategy</span>    
                      <p class="multiSel" id="SellingSkillsFocusAreaShow"></p>  
                    </a>
                    </dt>
  
                    <dd>
                        <div class="mutliSelect">
                            <ul  id="ddSellingSkillsFocusArea">
                               
                            </ul>
                        </div>
                    </dd>
                </dl>

                 <div style="width:80%;">
              <h3  style="margin-bottom:10px; text-align:center; margin-top:10px;">Brands</h3>
                  </div>
               <div  style="float: left; margin-right: 10px;">
               <%-- <select id="ddProduct" multiple="multiple" style="width:250px;height:130px">
                </select>--%>

                   <dl id="ddProductMain" class="dropdown semi-square" style="float: left; margin-right: 10px; background-color: #F5F5F5;z-index: 1"> 
  
                    <dt>
                    <a href="#">
                      <span class="hida" id="Producttitle">Select Brands</span>    
                      <p class="multiSel" id="ProductShow"></p>  
                    </a>
                    </dt>
  
                    <dd>
                        <div class="mutliSelect">
                            <ul  id="ddProduct">
                               
                            </ul>
                        </div>
                    </dd>
                </dl>
            </div>


         </div>
           
            <br />
            <div >
                <%--<h3>Remarks :</h3>--%>
                   <div style="width:240px; margin-top:150px;">
              <h3 for="ddStretchedTarget" style="margin-top:10%;">Remarks</h3>
                  </div>
                <textarea id="txtRemark" style="resize: none; width: 80%; " class="styleid" placeholder="Remarks" ></textarea>
            </div>


             <div class="parent">
        <input id="btnSave" name="btnSave" type="button" class="btnsaless" value="Submit" />
        <input id="btnCancel" name="btnCancel" type="button" class="btnsaless" value="Cancel" />
    </div>

        </div>

        <div class="right">
            <div class="btn"> 
                 <a id="btnlastvisits" name="btnlastvisits" type="button" href="#popup1" style="width:85%" class="btnsaless" >Last Visits</a>
            </div>
            <div id="mapppp" style="height: 300px; width: 100%;">
                </div>
        </div>

        <div style="clear: both"></div>
    </div>
    <div id="popup1" style="z-index:99999" class="overlay">
        <div class="popup">
            <h2>Last 5 Days Visits</h2>
            <a class="close" href="#">&times;</a>
            <br />
             <div class="content" >
            <table id="mio">
                <thead id="tth" >
                    <tr>
                         <td>
                        Date
                        </td>
                            <td>
                            Sales Achieved Yesterday
                        </td>
                             <td>
                            Sales Forecast Today
                        </td>
                             <td>
                             Contact Point
                        </td>
                        <td>
                             Comments
                        </td>
                        
                    </tr>
                </thead>
                <tbody id="lastrecord">

                </tbody>
            </table>

             <table id="flm">
                <thead id="ftth" >
                    <tr>
                         <td>
                        Date
                        </td>
                            <td>
                            FLM Name
                        </td>
                             <td>
                            Associate Name
                        </td>                           
                        <td>
                             NCSM Focus Area
                        </td><td>
                             PFSP Focus Area
                        </td><td>
                             Chemist Focus Area
                        </td>
                          <td>
                            Sales Achieved Yesterday
                        </td>
                             <td>
                            Sales Forecast Today
                        </td>
                             <td>
                             Contact Point
                        </td>
                             <td>
                             Comments
                        </td>
                    </tr>
                </thead>
                <tbody id="flastrecord">

                </tbody>
            </table>
            </div>
        </div>
    </div>
    <div class="content">
        <div id="gridSalesFeedback">
        </div>

    </div>
</asp:Content>
