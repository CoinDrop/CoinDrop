Endpoint                    | GET     | POST     | PUT     | DELETE
--------------------------- | ------- | -------- | ------- | ------
login                       |         | login    |         |
logout                      |         | logout   |         |
user                        | index   | signup   |         |
user/new                    | new     |          |         |
user/:user\_id              | show    |          | update  | destroy
user/:user\_id/edit         | edit    |          |         |
deal                        | index   |          |         |
deal/:user\_id              | index   |          |         |
deal/:buyer\_id/:seller\_id | index   | create   |         |
deal/:deal\_id              | show    |          | update  | destroy
deal/:deal\_id/edit         | edit    |          |         |
deal/:deal\_id/offer        |         | offer    |         |
deal/:deal\_id/cancel       |         | cancel   |         |
deal/:deal\_id/decline      |         | decline  |         |
deal/:deal\_id/accept       |         | accept   |         |
deal/:deal\_id/settle       |         | settle   |         |
deal/:deal\_id/pay_buyer    |         | (settle) |         |
deal/:deal\_id/pay_seller   |         | (settle) |         |

Not all shown routes are intended to actually be provided for a while, if ever.
