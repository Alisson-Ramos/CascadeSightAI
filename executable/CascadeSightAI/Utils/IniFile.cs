using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;

namespace CENTRAL.INFRASTRUCTURE.Context.Utils
{

    /// <summary>
    /// Classe para manipulação de arquivos INI utilizando chamadas à API do Windows.
    /// Permite leitura, escrita, deleção de chaves e seções em arquivos INI.
    /// </summary>
    public class IniFile
    {
        /// <summary>
        /// Caminho completo do arquivo INI.
        /// </summary>
        private readonly string Path;

        /// <summary>
        /// Nome do executável atual, usado como seção padrão.
        /// </summary>
        private readonly string EXE = Assembly.GetExecutingAssembly().GetName().Name;

        // Importa a função WritePrivateProfileString da API do Windows para escrita em arquivos INI
        [DllImport("kernel32", CharSet = CharSet.Unicode)]
        private static extern long WritePrivateProfileString(string Section, string Key, string Value, string FilePath);

        // Importa a função GetPrivateProfileString da API do Windows para leitura de arquivos INI
        [DllImport("kernel32", CharSet = CharSet.Unicode)]
        private static extern int GetPrivateProfileString(string Section, string Key, string Default, StringBuilder RetVal, int Size, string FilePath);

        /// <summary>
        /// Construtor da classe IniFile.
        /// Define o caminho completo do arquivo INI.
        /// </summary>
        /// <param name="IniPath">Caminho do arquivo INI. Se nulo, usa o nome do executável com extensão ".ini".</param>
        public IniFile(string IniPath = null)
        {
            Path = new FileInfo(IniPath ?? EXE + ".ini").FullName;
        }

        /// <summary>
        /// Lê o valor de uma chave em uma seção específica do arquivo INI.
        /// </summary>
        /// <param name="Key">Nome da chave a ser lida.</param>
        /// <param name="Section">Nome da seção onde a chave está. Se nulo, usa "default".</param>
        /// <returns>Valor da chave como string. Retorna string vazia se chave não existir.</returns>
        public string Read(string Key, string Section = null)
        {
            var RetVal = new StringBuilder(255);
            GetPrivateProfileString(Section ?? "default", Key, "", RetVal, RetVal.Capacity, Path);
            return RetVal.ToString();
        }

        /// <summary>
        /// Lê o valor de uma chave em uma seção específica do arquivo INI, permitindo definir a capacidade do buffer de leitura.
        /// </summary>
        /// <param name="Key">Nome da chave a ser lida.</param>
        /// <param name="capacity">Tamanho do buffer para leitura do valor.</param>
        /// <param name="Section">Nome da seção onde a chave está. Se nulo, usa "default".</param>
        /// <returns>Valor da chave como string.</returns>
        public string Read(string Key, int capacity, string Section = null)
        {
            var RetVal = new StringBuilder(capacity);
            GetPrivateProfileString(Section ?? "default", Key, "", RetVal, RetVal.Capacity, Path);
            return RetVal.ToString();
        }

        /// <summary>
        /// Escreve ou altera o valor de uma chave em uma seção específica do arquivo INI.
        /// </summary>
        /// <param name="Key">Nome da chave a ser escrita/alterada.</param>
        /// <param name="Value">Valor a ser definido para a chave.</param>
        /// <param name="Section">Nome da seção onde a chave será escrita. Se nulo, usa o nome do executável atual.</param>
        public void Write(string Key, string Value, string Section = null)
        {
            WritePrivateProfileString(Section ?? EXE, Key, Value, Path);
        }

        /// <summary>
        /// Remove uma chave específica de uma seção do arquivo INI.
        /// </summary>
        /// <param name="Key">Nome da chave a ser removida.</param>
        /// <param name="Section">Nome da seção onde a chave está. Se nulo, usa o nome do executável atual.</param>
        public void DeleteKey(string Key, string Section = null)
        {
            Write(Key, null, Section ?? EXE);
        }

        /// <summary>
        /// Remove uma seção inteira do arquivo INI.
        /// </summary>
        /// <param name="Section">Nome da seção a ser removida. Se nulo, usa o nome do executável atual.</param>
        public void DeleteSection(string Section = null)
        {
            Write(null, null, Section ?? EXE);
        }

        /// <summary>
        /// Verifica se uma chave existe dentro de uma seção específica do arquivo INI.
        /// </summary>
        /// <param name="Key">Nome da chave a verificar.</param>
        /// <param name="Section">Nome da seção onde a chave pode estar. Se nulo, usa "default".</param>
        /// <returns>True se a chave existir e possuir valor; False caso contrário.</returns>
        public bool KeyExists(string Key, string Section = null)
        {
            return Read(Key, Section).Length > 0;
        }
    }
}