
using CENTRAL.INFRASTRUCTURE.Context.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;


namespace CENTRAL.SERVICES
{

    /// <summary>
    /// Classe para ler configurações de arquivos INI e retornar configurações específicas para banco de dados e e-mail.
    /// </summary>
    public class IniConfigure
    {


        public static string GetSettings(string rootPath)
        {
            // Obtém o caminho raiz para localizar o arquivo .ini
            //string rootPath = System.Web.Hosting.HostingEnvironment.MapPath("~/");

            IniFile ConfigureFile = new IniFile($"{rootPath}\\config\\settings.ini");
            
            string url = "";

            // Verifica se o arquivo INI contém a chave para definir se está em produção
            if (ConfigureFile.KeyExists(null, "WebView"))
            {
                const string Section = "WebView";

                url = ConfigureFile.Read("URL", Section);
            }
            else
            {
                // Caso chave isProd não exista, lança exceção para informar erro de configuração
                throw new Exception("Arquivo de Configuração Inexistente");
            }

            return url;
        }

    }
}