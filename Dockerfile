# Estágio de compilação
FROM node:alpine3.17 as build

WORKDIR /app

# Copia os arquivos de dependência do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci --silent

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto React
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos de compilação do React para o diretório do servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Configuração do Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expõe a porta do servidor Nginx
#EXPOSE 80
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]