var fruits = <fruits shop="A Mart">
  <item price="130">Banana</item>
  <item price="200">Apple</item>
  <item price="500">Mango</item>
</fruits>;
print(fruits.@shop);                // 결과: A Mart
print(fruits.item.(@price == 500)); // 결과: Mango
