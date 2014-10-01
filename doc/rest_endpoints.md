Endpoint                      | GET     | POST     | PUT     | DELETE
----------------------------- | ------- | -------- | ------- | ------
login                         |         | login    |         |
logout                        |         | logout   |         |
users                         | index   | signup   |         |
users/new                     | new     |          |         |
users/:name                   | show    |          | update  | destroy
users/:name/edit              | edit    |          |         |
deals                         | index   |          |         |
deals/users/:name             | index   |          |         |
deals/pair/:buyer/:seller     | index   | create   |         |
deals/:deal                   | show    |          | update  | destroy
deals/:deal/edit              | edit    |          |         |
deals/:deal/offer             |         | offer    |         |
deals/:deal/cancel            |         | cancel   |         |
deals/:deal/decline           |         | decline  |         |
deals/:deal/accept            |         | accept   |         |
deals/:deal/settle            |         | settle   |         |
(deals/:deal/pay_buyer)       |         | (settle) |         |
(deals/:deal/pay_seller)      |         | (settle) |         |

Not all routes shown are intended to actually be provided for a while, if ever.
