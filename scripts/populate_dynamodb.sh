#!/bin/sh

declare -a products=('{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "title": {"S": "Post Card 1"}, "description": {"S": "Short Product Description1"}, "price": {"N": "24"}}'
                     '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "title": {"S": "Post Card 2"}, "description": {"S": "Short Product Description2"}, "price": {"N": "15"}}'
                     '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "title": {"S": "Post Card 3"}, "description": {"S": "Short Product Description3"}, "price": {"N": "23"}}'
                     '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "title": {"S": "Post Card 4"}, "description": {"S": "Short Product Description4"}, "price": {"N": "15"}}'
                     '{"id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "title": {"S": "Post Card 5"}, "description": {"S": "Short Product Description5"}, "price": {"N": "23"}}'
                     '{"id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "title": {"S": "Post Card 6"}, "description": {"S": "Short Product Description6"}, "price": {"N": "15"}}')

declare -a stocks=('{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "count": {"N": "1"}}'
                   '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "count": {"N": "2"}}'
                   '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "count": {"N": "3"}}'
                   '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "count": {"N": "4"}}'
                   '{"product_id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "count": {"N": "5"}}'
                   '{"product_id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "count": {"N": "6"}}')

for i in "${products[@]}"
do
    aws dynamodb put-item \
        --table-name shop_products \
        --item "$i"
done

for i in "${stocks[@]}"
do
    aws dynamodb put-item \
        --table-name shop_stocks \
        --item "$i"
done