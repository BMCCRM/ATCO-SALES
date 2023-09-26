<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="UserProfile.aspx.cs" Inherits="PocketDCR2.Form.UserProfile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .username {
            color: #000;
            font-size: 26px;
            font-weight: bold;
            line-height: 30px;
            margin-top: 0px;
        }

        .userdesignation {
            color: #333;
            display: inline;
            font-size: 16px;
            font-weight: normal;
            margin-top: 20px;
            position:absolute;
        }

        .userLocation {
            color: #66696a;
            font-size: 13px;
            font-weight: normal;
            line-height: 17px;
            margin-top: 60px;
            position:absolute;
        }
        .userEducation {
            color: #66696a;
            font-size: 13px;
            font-weight: normal;
            line-height: 17px;
            margin-top: 120px;
            position:absolute;
        }
        .typeEdu {
            color: #999;
            font-size: 11px;
            padding: 2px 20px 0 0;
            vertical-align: top;
            white-space: nowrap;
            margin-top: 120px;
            position:absolute;
        }
        .typeEdutxt {
            color: #999;
            font-size: 11px;
            padding: 2px 10px 0 0;
            vertical-align: top;
            white-space: nowrap;
            margin-left:10px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div id="content3">
        <div id="foo">
        </div>
        <table width="100%" cellspacing="10" cellpadding="10" border="0" id="content" style="float: left;">
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <%-- <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Estimate Working Days VS Field Working Days
                                        </th>
                                    </tr>--%>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="container2" style="width: 250px; height: 250px; margin: 0; padding: 0 5px; float: left;">
                                                <img src="../TeamImages/0_image.jpg" id="userimage" alt="User Image" height="250" width="250" />
                                            </div>
                                            <div id="prodfre" style="width: 350px; height: 350px; margin: 0; padding: 0 5px; float: left;">
                                                <div class="username">
                                                    <span>SAEEDULLAH</span>
                                                </div>
                                                <div class="userdesignation">
                                                    <p>Designation</p>
                                                </div>
                                                <div class="userLocation">
                                                    <p>Pakistan | Karachi</p>
                                                </div>
                                                 <div class="typeEdu">
                                                    <p>Education: <strong class="typeEdutxt">BSCS</strong></p>
                                                </div>
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                            <%--<td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">                                
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="prodfre" style="width: 350px; height: 350px; margin: 0; padding: 0 5px; float: left;">
                                                <h1>SAEEDULLAH</h1>
                                            </div>
                                            <div class="loding_box_outer">
                                               
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>--%>
                            <%--<td>

                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Customer Coverage %
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="customerCov" style="width: 350px; height: 350px; margin: 0; float: left;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>--%>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
