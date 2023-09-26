<%@ Page Title="SPO FeedBack" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="FMOFeedback.aspx.cs" Inherits="PocketDCR2.Form.FMOFeedback" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../Scripts/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/JavaScript">

        curvyCorners.addEvent(window, 'load', initCorners);

        function initCorners() {
            var settings = {
                tl: { radius: 10 },
                tr: { radius: 10 },
                bl: { radius: 10 },
                br: { radius: 10 },
                antiAlias: true
            }
            curvyCorners(settings, "#box");
        }

        $(document).ready(function () {
            var height = $('#box').innerHeight();
            var height2 = height - 210 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)

            
        });

    </script>
      <style type="text/css">
        .auto-style1 {
            height: 40px;
        }
    
        /*tr:nth-child(odd) {
            background-color: #efede2;
        }

        tr:nth-child(even) {
            background-color: #f6f5f0;
        }*/
        
        .ob_gC_Fc {
            /*background-image: url("header.gif");*/
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 33px;
            text-align: center;
        }

        .ob_gAL {
            color: #d99e00;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: bold;
            text-decoration: none;
        }

        .ob_text {
            color: #5e5e70;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: normal;
            height: 24px;
            text-align: center;
            vertical-align: middle;
        }
        .auto-style2 {
            width: 206px;
        }
        .auto-style3 {
            height: 40px;
            width: 10px;
        }

            .sorting,
     .sorting_asc,
    .sorting_desc {
        cursor: pointer;
        *cursor: hand
    }
    .sorting,
    .sorting_asc,
    .sorting_desc,
    .sorting_asc_disabled,
    .sorting_desc_disabled {
        background-repeat: no-repeat;
        background-position: center right
    }
.sorting {
    background-image: url("../Scripts/datatable/images/sort_both.png") 
}
 .sorting_asc {
    background-image: url("../Scripts/datatable/images/sort_asc.png")
}
 .sorting_desc {
    background-image: url("../Scripts/datatable/images/sort_desc.png")
}
 .sorting_asc_disabled {
    background-image: url("../Scripts/datatable/images/sort_asc_disabled.png")
}
.sorting_desc_disabled {
    background-image: url("../Scripts/datatable/images/sort_desc_disabled.png")
}


.editSortingRemove{
    background:none !important;
}
.deleteSortingRemove{
    background:none !important;
}
    </style>
    <script src="FMOFeedBack.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>

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

                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div id="content-table-inner" style="float:left; margin-top:30px;">
                    <div style="float:right; margin-top:65px; width:554px; margin-left:0px">
                    <table border="0" width="25%" cellpadding="0" cellspacing="0">
                        <tr valign="top">
                            <td valign="top">
                                <!-- start id-form -->
                                <table border="0" cellpadding="10" cellspacing="0" id="id-" style="font-weight: bold">
                                   

                                         

                                    <div class="user_list">
                                        <div style="border-left: solid 1px #D8D0C9;">
                                            <table border="0" cellpadding="0" cellspacing="0" class="morning_view" width="0%"
                                                style="border-width: 0px; border-collapse: collapse;">
                                                <tr>
                                                    <th>SPO List
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <select id="ddlMIO" class="styledselect_form_1">
                                                            <option></option>
                                                        </select>
                                                    </td>
                                                </tr>

                                            </table>
                                        </div>
                                    </div>

                                    &nbsp;
                                    
                                    <div class="comment_area">
                                       <span>Comments :</span>
                                        <span>
                                        <textarea id="txtmainComments" class="styledtextarea" rows="4" cols="60"></textarea>
                                            </span>
                                        &nbsp;
                                        <div class="clear">
                                        </div>
                                        &nbsp;<div class="clear">
                                        </div>
                                          <input type='button' id='btnSave' value='  Submit ' />
                                </table>
                                <!-- end id-form  -->
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                            </td>
                            <td></td>
                        </tr>
                    </table>
                        </div>

                      <div class="wrapper-inner" style="margin-right:40px; width: 45%;">

                    <div style="padding-bottom:10px !important; ">
                        <table>
                             <tr>
                                        <td><h4>Filter By Year - Month :</h4>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td>
                                            Start Date :
                                          <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="stdate" runat="server">
                                        </asp:CalendarExtender>

                                             End Date :
                                          <asp:TextBox ID="enddate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="enddate" runat="server">
                                        </asp:CalendarExtender>

                                        </td>
                                    </tr>
                        </table>

                          <div class="ghierarchy2">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>SPO Feedback</h2>
                            </div>
                            <div class="inner-left">
                            <div id="ComFeedback">
                                </div>
                               </div> 
                          <div class="clear">
                        </div>
                    </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

</asp:Content>