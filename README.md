# qr-code-pix

## About <a name = "about"></a>

Exemplo de como gerar um pix code e qrcode.


## Usage <a name = "usage"></a>

```sh

git clone https://github.com/gustavonovaes/pix-qrcode
cd pix-qrcode
npm install --production
node index.js

```

Output:

```
>  node index.js 
PIXCode
00020126810014BR.GOV.BCB.PIX0125contato@gustavonovaes.dev0230A Vida, o Universo e Tudo Mais520400005303986540542.005802BR5914GUSTAVO NOVAES6006RECIFE62070503***63040849
                             
                             
    █▀▀▀▀▀█ ▀▄  ▀ █▀▀▀▀▀█    
    █ ███ █ ▄ ▄▄█ █ ███ █    
    █ ▀▀▀ █ █▄█▄▀ █ ▀▀▀ █    
    ▀▀▀▀▀▀▀ █▄█▄█ ▀▀▀▀▀▀▀    
    █  ▄▀ ▀█▀▀ █▄▀▀▀▀▀▄ █    
    ▄▄█▀█▄▀▀█▀▄▀ ▄██▀▀▀█     
    ▀   ▀ ▀▀█ ▀ ███▄█ █▀█    
    █▀▀▀▀▀█ ▀▀▄▄█▀ ▀█ ▀█▄    
    █ ███ █ ▀ ██▄ ▀▀▄▄ ▄█    
    █ ▀▀▀ █  ██▀ ▄█▄█ ▀      
    ▀▀▀▀▀▀▀ ▀ ▀ ▀▀▀▀    ▀    
                             
                             
base64:
data:image/png;base64,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

```
