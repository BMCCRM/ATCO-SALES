<%@ Page Title="Virtual Feedback Center" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesFeedback.aspx.cs" Inherits="PocketDCR2.Form.SalesFeedback" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts-more.js" type="text/javascript"></script>
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="SalesFeedbackJS.js" type="text/javascript"></script>
    <style type="text/css">
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: absolute;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -125px;
            z-index: 222;
            display: block;
        }

        .loding_box_outer {
            width: 100%;
            height: 100%;
            position: relative;
            left: 0px;
            top: 0px;
            z-index: 111;
            background: #e1e1e1;
            opacity: 0.6;
            display: none;
        }


        #ContentPlaceHolder1_tblCalls {
            width: 100%;
        }

            #ContentPlaceHolder1_tblCalls td a {
                color: #EC8026;
            }

        .style1 {
            color: #E44C16;
        }

        .style2 {
            width: 3px;
        }

        .roundedPanel {
            width: 300px;
            background-color: #F5EBD7;
            color: white;
            font-weight: bold;
        }

        .style3 {
            color: #FFFFFF;
            font-size: 13px;
            font-weight: bold;
        }

        .accordionHeader {
            border: 1px solid #2F4F4F;
            color: white;
            background-color: #634329;
            font-family: News Gothic MT Bold;
            font-size: 10px;
            font-weight: bold;
            padding: 5px;
            margin-top: 5px;
        }

        .accordionContent {
            background-color: #F5EBD7;
            border: 1px dashed #2F4F4F;
            border-top: none;
            padding: 5px;
            padding-top: 10px;
        }

        .style4 {
            font-size: x-large;
        }

        .style6 {
            font-size: small;
            font-weight: bold;
            color: White;
        }

        .style7 {
            width: 70px;
            line-height: 30px;
        }

        .style8 {
            width: 70px;
            font-weight: bold;
            line-height: 35px;
        }

        .style9 {
            width: 70px;
            color: #FFFFFF;
            font-weight: bold;
            line-height: 30px;
        }

        .style12 {
            color: #FFFFFF;
            font-weight: bold;
            width: 224px;
        }

        .content_outer {
            background-image: none;
        }

        #content {
            width: 100%;
        }

        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW, .ob_gNRM .ob_gCc1, .ob_gFCont, .ob_gR, .ob_gNRM, .ob_gBCont .ob_gCS, .ob_gBCont .ob_gCS_F {
            background: none !important;
        }

        .ob_gHR {
            background: #A28F7F !important;
            color: #fff !important;
        }

        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW {
            color: #fff !important;
        }

        #counter {
            font-weight: bold;
            font-family: courier new;
            font-size: 12pt;
            color: White;
        }

        table#content3 {
            display: block;
        }

        #foo {
            width: 99%;
            text-align: right;
            padding: 1px 0;
            text-transform: capitalize;
            font-size: 12px;
            color:white;
        }

        #h1callperday {
            font-size: 60px;
            font-family: 'Times New Roman';
            color: #00FE00;
            text-align: center;
            padding-top: 40px;
        }

        #pcallperdayText {
            font-family: 'Times New Roman';
            text-align: center;
        }

        #h1daysinfield {
            font-size: 60px;
            font-family: 'Times New Roman';
            color: #FD6534;
            text-align: center;
            padding-top: 40px;
        }

        #pdaysinfieldText {
            font-family: 'Times New Roman';
            text-align: center;
        }
         #btnResult {
          background: #6197b8;
          background-image: -webkit-linear-gradient(top, #6197b8, #389ede);
          background-image: -moz-linear-gradient(top, #6197b8, #389ede);
          background-image: -ms-linear-gradient(top, #6197b8, #389ede);
          background-image: -o-linear-gradient(top, #6197b8, #389ede);
          background-image: linear-gradient(to bottom, #6197b8, #389ede);
          -webkit-border-radius: 15;
          -moz-border-radius: 15;
          border-radius: 15px;
          -webkit-box-shadow: 3px 5px 5px #241624;
          -moz-box-shadow: 3px 5px 5px #241624;
          box-shadow: 3px 5px 5px #241624;
          font-family: Arial;
          color: #ffffff;
          padding: 3px 6px 3px 6px;
          text-decoration: none;
          margin-bottom:10px;
        }

      #btnResult:hover {
          background: #3cb0fd;
          text-decoration: none;
        }
     main {
  min-width: 320px;
  max-width: 100%;
  padding: 10px;
  background: #fff;
}

section {
  display: none;
  padding: 20px 0 0;
  border-top: 1px solid #ddd;
}

.inputt {
  display: none;
}

.aalabel {
  display: inline-block;
  margin: 0 0 -1px;
  padding: 15px 25px;
  font-weight: 600;
  text-align: center;
  color: #bbb;
  border: 1px solid transparent;
}

.aalabel:before {
  font-family: fontawesome;
  font-weight: normal;
  margin-right: 10px;
}

.aalabel[for*='1']:before {
  content: '\f1cb';
}

.aalabel[for*='2']:before {
  content: '\f17d';
}

.aalabel[for*='3']:before {
  content: '\f16b';
}

.aalabel[for*='4']:before {
  content: '\f1a9';
}

.aalabel:hover {
  color: #888;
  cursor: pointer;
}

.inputt:checked + .aalabel {
  color: #555;
  border: 1px solid #ddd;
  border-top: 2px solid orange;
  border-bottom: 1px solid #fff;
}

#tab1:checked ~ #content1,
#tab2:checked ~ #content2,
#tab3:checked ~ #content3,
#tab4:checked ~ #content4 {
  display: block;
}

@media screen and (max-width: 650px) {
  .aalabel {
    font-size: 0;
  }

  .aalabel:before {
    margin: 0;
    font-size: 18px;
  }
}
     
         
    </style>
    <%--  <script type="text/javascript">

        var limit = "10:00"
        if (document.images) {
            var parselimit = limit.split(":")
            parselimit = parselimit[0] * 60 + parselimit[1] * 1
        }
        function beginrefresh() {
            if (!document.images)
                return
            if (parselimit == 1)
                window.location.reload()
            else {
                parselimit -= 1
                curmin = Math.floor(parselimit / 60)
                cursec = parselimit % 60
                if (curmin != 0)
                    curtime = "next refresh in " + curmin + ":" + cursec + " minutes"
                else
                    curtime = "next refresh in " + cursec + " second"
                window.status = curtime
                document.getElementById('foo').innerHTML = curtime;
                setTimeout("beginrefresh()", 1000)
            }
        }
        window.onload = beginrefresh
    </script>--%>

    <style type="text/css">
        .responstable {
  margin: 1em 0;
  width: 100%;
  overflow: hidden;
  background: #FFF;
  color: #024457;
  border-radius: 10px;
  border: 1px solid #167F92;
}
.responstable tr {
  border: 1px solid #D9E4E6;
}
.responstable tr:nth-child(odd) {
  background-color: #EAF3F3;
}
.responstable th {
  display: none;
  border: 1px solid #FFF;
  background-color: #167F92;
  color: #FFF;
  padding: 1em;
}
.responstable th:first-child {
  display: table-cell;
  text-align: center;
}
.responstable th:nth-child(2) {
  display: table-cell;
}
.responstable th:nth-child(2) span {
  display: none;
}
.responstable th:nth-child(2):after {
  content: attr(data-th);
}
@media (min-width: 480px) {
  .responstable th:nth-child(2) span {
    display: block;
  }
  .responstable th:nth-child(2):after {
    display: none;
  }
}
.responstable td {
  display: block;
  word-wrap: break-word;
  max-width: 7em;
}
.responstable td:first-child {
  display: table-cell;
  text-align: center;
  border-right: 1px solid #D9E4E6;
}
@media (min-width: 480px) {
  .responstable td {
    border: 1px solid #D9E4E6;
  }
}
.responstable th, .responstable td {
  text-align: left;
  margin: .5em 1em;
}
@media (min-width: 480px) {
  .responstable th, .responstable td {
    display: table-cell;
    padding: 1em;
  }
}
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <%-- <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>--%>
    <div id="content3">
        <div id="foo">
            Div you want to change
        </div>
         <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/call.png" style="padding-right:0px;"/>
                        Virtual Feedback Center</h1>
                    <%--<asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />--%>
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>
        <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table"
            style="margin-top: 15px;">
            <tr>
                <th rowspan="3" class="sized">
                    <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                </th>
                <th class="topleft"></th>
                <td id="tbl-border-top">&nbsp;
                </td>
                <th class="topright"></th>
                <th rowspan="3" class="sized">
                    <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
                </th>
            </tr>
            <tr>
                <td id="tbl-border-left"></td>
                <td>
                    <!--  start content-table-inner -->
                    <div id="content-table-inner">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                            <tr valign="top">
                                <td valign="top">
                                    <!-- start id-form -->
                                    <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                        <tr>
                                            <th valign="top" id="col1">
                                                <div class="divcol">
                                                    <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col2">
                                                <div class="divcol">
                                                    <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col3">
                                                <div class="divcol">
                                                    <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                           <%-- <th valign="top" id="col4">
                                                <div class="divcol">
                                                    <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>--%>
                                            <th valign="top" id="col5">
                                                <div class="divcol">
                                                </div>
                                            </th>
                                            <th valign="top" id="col6">
                                                <div class="divcol">
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th valign="top" id="col11">
                                                <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col22">
                                                <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col33">
                                                <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                           <%-- <th valign="top" id="col44">
                                                <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>--%>
                                            <th valign="top" id="col55">
                                                <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col66">
                                                <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                        </tr>
                                    </table>
                       

                                    <!-- end id-form  -->
                                </td>
                            </tr>
                             <tr>
                                
                                <td>
                                    <div id="mapppp" style="height: 300px; width: 100%;">
                                    <%--<img src="../images/form/blank.gif" width="695" height="1" alt="blank" />--%>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                </td>
                                <td></td>
                            </tr>
                        </table>
                        <div class="clear">
                        </div>
                    </div>
                    <!--  end content-table-inner  -->
                </td>
                <td id="tbl-border-right"></td>
            </tr>
            <tr>
                <th class="sized bottomleft"></th>
                <td id="tbl-border-bottom">&nbsp;
                </td>
                <th class="sized bottomright"></th>
            </tr>
        </table>
        <table width="100%" cellspacing="10" cellpadding="10" border="0" id="content" style="float: left;">
            
           <tr>
                <td id="loadsalesdata" >
                    <main >
  
                      <input class="inputt" id="tab1" type="radio" name="tabs" checked="checked" />
                      <label class="aalabel" for="tab1">FLM</label>
    
                      <input class="inputt" id="tab2" type="radio" name="tabs" />
                      <label class="aalabel" for="tab2">FMO</label>
    
                        
                        <input class="inputt"style="color: #555;border: 1px solid #ddd;border-top: 2px solid orange;border-bottom: 1px solid #fff"  type="radio" name="tabs" />
                      <label  style="margin-left:60%;display: inline-block;padding: 15px 25px;font-weight: 600;text-align: center;color: #555;border: 1px solid #ddd;border-top: 2px solid orange;border-bottom: 1px solid #fff;" id="tabbtotal" for="tab3"> Totals Calls</label>

                      <section id="content1">
                        <div id="newtable">

                        </div>
                      </section>
    
                      <section id="content2">
                          <div id="miotable">
                            </div>
                         
                      </section>
    
                    </main>
              
                </td>
            </tr>
        </table>
    </div>
    <%--    <asp:Label ID="hdnMode" runat="server" Text="test" ClientIDMode="Static" />--%>
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
</asp:Content>
