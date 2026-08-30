Vou te mostrar os caminhos mais rápidos para verificar o erro 500 no Laravel e no Docker, e também como reproduzir a causa exata.

## 🔎 Como ver o erro 500 no Laravel

O caminho mais direto é checar o log do Laravel em laravel.log.

### 1) Ver o log em tempo real
No terminal do projeto:

```bash
tail -f storage/logs/laravel.log
```

Se estiver usando Docker:

```bash
docker compose exec lr_app tail -f storage/logs/laravel.log
```

Ou os logs do container em geral:

```bash
docker compose logs -f --tail=200
```

---

## 🐳 Se o 500 for no container

No seu ambiente, os containers parecem se chamar algo como `lr_server` e `lr_app`. Então pode testar:

```bash
docker compose logs -f --tail=200 lr_server
```

ou

```bash
docker compose logs -f --tail=200 lr_app
```

Isso mostra o erro que o PHP/Nginx/Apache está gerando.

---

## ✅ Para ver a causa exata

No arquivo .env, confirme:

```dotenv
APP_ENV=local
APP_DEBUG=true
```

Se estiver em produção, o Laravel geralmente esconde detalhes. Em local, isso ajuda a mostrar a stack trace.

Depois de ajustar o .env, reinicie o app:

```bash
docker compose down
docker compose up -d --build
```

ou, se for só o app:

```bash
docker compose restart lr_server
```

---

## 💡 Dica importante

Se o erro for 500 sem mensagem útil, muitas vezes a real causa está em:
- erro de sintaxe PHP
- migration/DB quebrada
- config inválida
- exception no controller
- problema com Passport/rotas

Então o melhor fluxo é:

1. olhar laravel.log
2. olhar `docker compose logs -f`
3. confirmar `APP_DEBUG=true`
4. reiniciar containers se necessário

Se quiser, eu posso te ajudar a interpretar o log exato que aparecer no seu projeto.