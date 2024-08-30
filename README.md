# Teste Técnico Shopper

## Iniciando a API

1. Clone o projeto utilizando o comando:

    ```bash
    git clone git@github.com:WesleyOliveira01/water-and-gas-meter.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd water-and-gas-meter
    ```

3. Inicie os containers com o Docker Compose:

    ```bash
    docker compose up -d --build
    ```

## Documentação da API

### 1. Receber Imagem em Base64

- **Endpoint**: `POST /upload`

- **Descrição**: Recebe uma imagem em base64 de um contador de água ou gás para que a API do Gemini AI realize a leitura.

- **Request Body**:

    ```json
    {
      "image": "base64",
      "customer_code": "string",
      "measure_datetime": "datetime",
      "measure_type": "WATER" ou "GAS"
    }
    ```

### 2. Confirmar Valor Recebido

- **Endpoint**: `PATCH /confirm`

- **Descrição**: Confirma o valor recebido pelo Gemini AI.

- **Request Body**:

    ```json
    {
      "measure_uuid": "string",
      "confirmed_value": integer
    }
    ```

### 3. Listar Medidas

- **Endpoint**: `GET /<customer_code>/list`

- **Descrição**: Lista as medidas filtradas pelo `customer_code` e, opcionalmente, pelo `measure_type`.

- **Parâmetros de Consulta**:

    | Parâmetro        | Tipo    | Descrição                                      |
    | :--------------- | :------ | :--------------------------------------------- |
    | `customer_code`  | `string` | Código do cliente (obrigatório)               |
    | `measure_type`   | `string` | Tipo de medida (opcional), valores possíveis: 'WATER' ou 'GAS' |

- **Exemplo de Request com `measure_type`**:

    ```http
    GET /<customer_code>/list?measure_type=WATER
    ```
