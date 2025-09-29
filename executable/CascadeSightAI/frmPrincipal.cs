using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CENTRAL.SERVICES;
using Microsoft.Web.WebView2.WinForms;

namespace WebviewDashboard
{
    public partial class frmPrincipal : Form
    {
        private WebView2 webView;
        public frmPrincipal()
        {
            this.TopMost = true;

            // Permite capturar tecla ESC
            this.KeyPreview = true;
            this.KeyDown += MainForm_KeyDown;

            webView = new WebView2 { Dock = DockStyle.Fill };
            this.Controls.Add(webView);

            InitializeComponent();
        }

        private void MainForm_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Escape)
            {
                // Sai do modo tela cheia
                this.FormBorderStyle = FormBorderStyle.Sizable;
                this.WindowState = FormWindowState.Normal;
                this.TopMost = false;
            }
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                await webView.EnsureCoreWebView2Async(null);
                webView.CoreWebView2.Navigate(IniConfigure.GetSettings(AppDomain.CurrentDomain.BaseDirectory));
            }
            catch (Exception exception)
            {
                MessageBox.Show("ERRO ESPERADO");
                throw;
            }
            

            
        }
    }
}
