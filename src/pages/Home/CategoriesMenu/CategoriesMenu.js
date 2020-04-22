import React, { useState, Fragment, useEffect } from "react";
import {
  Menu,
  Segment,
  Header,
  Grid,
  List,
  Image,
  Button,
  Accordion,
  Divider,
  Input
} from "semantic-ui-react";
import {
  getCategories,
  incrementToOrder,
  decrementFromOrder,
  getProducts
} from "../../../actions";
import { connect } from "react-redux";
import QuantityProduct from "../../../components/QuantityProduct/QuantityProduct";
import OrderPrice from "../../../components/OrderPrice/OrderPrice";
import FindProducts from "../../../components/FindProducts/FindProducts";

const CategoriesMenu = (props) => {
  const { state, getCategories, incrementToOrder, decrementFromOrder, getProducts } = props;
  const { categories, order, productsForSearch } = state;
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // we figure out last time which component is actived
  // we must have in onActive FindProducts or Products
  // we are showing up FindProducts or Products using onActive
  const [onActive, setOnActive] = useState("Products");

  useEffect(() => {
    getCategories();
    getProducts()
  }, []);

  const handleItemClick = (e, titleProps) => {};

  // we'll have products of subCategory
  const onClickSubCategory = (subCategory, name) => {
    setActiveSubCategory(name);
    setProducts(subCategory.products);
    setOnActive("Products")
  };

  // this component is showing up categories
  const contentOfCategories = (subCategories) => {
    return (
      <Menu secondary vertical>
        {subCategories.map((item, id) => (
          <Menu.Item
            key={id}
            name={item.ru}
            active={item.ru === activeSubCategory}
            onClick={(e, { name }) => onClickSubCategory(item, name)}
          />
        ))}
      </Menu>
    );
  };
  
  // we are clicking plus or minus button
  // increment or decrement are going to reducer and we are changing quantity
  const onClickAction = (text, item, quantity) => {
    if (text === "Plus") {
      incrementToOrder(item, quantity);
    } else {
      decrementFromOrder(item, quantity);
    }
  };

  const onChangeSearchProduct = (e) => {
    setIsLoading(true)
    setActiveSubCategory("")
    setSearchProduct(e.target.value)
    setOnActive("FindProducts")
  }

  // this function for showing up categories
  const categoriesPanels = categories.map((item, id) => {
    return {
      key: id,
      title: item.ru,
      content: { content: contentOfCategories(item.subCategories) },
    };
  });

  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchProduct !== ""){
        setIsLoading(true)
        setActiveSubCategory("")
        setOnActive("FindProducts")
      }
  }
  }

  return (
  <Fragment>
  <Header textAlign='center'>Меню</Header>
  <Divider />
  <Input placeholder='Введите товар' fluid icon='search' onChange={onChangeSearchProduct} onKeyDown={onHandleKeyDown} loading={isLoading} />
  <Divider hidden />
    <Grid columns={3} divided stretched>
      <Grid.Row>
        <Grid.Column>
          <Accordion
            onTitleClick={handleItemClick}
            panels={categoriesPanels}
            fluid
          />

          <Segment>
              {order.length === 0 ? null : <QuantityProduct />}
                 <OrderPrice />
          </Segment>

        </Grid.Column>
        <Grid.Column width={10}>
              { onActive === "Products" ?
                renderProductsWithOrderQuantity(products, order, onClickAction)
                :
                <FindProducts 
                  searchProduct={searchProduct}
                  stopLoading={() => setIsLoading(false)}
                  productsForSearch={productsForSearch}
                  categories={categories}
                />
              }
        </Grid.Column>
      </Grid.Row>
    </Grid></Fragment>
  );
};

const renderProductsWithOrderQuantity = (products, order, onClickAction) => {
  return <Segment><List divided relaxed>
    {products.map((item, id) => {
          let quantity = 0;
          order.forEach(element => {
            if (element._id === item._id){
              quantity = element.quantity;
            }
          });
          if (item.show) {
            return (
                <List.Item key={id}>
                  <Image
                    src={item.imageUrl}
                    style={{ width: 80, height: 50 }}
                  />
                  <List.Content>
                    <List.Header>{item.ru}</List.Header>
                    KZT {item.price}{" "}
                    В наличие {item.onSale ? "Есть" : "Нет"}
                  </List.Content>
                  <List.Content floated="right">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button size='mini' color="blue" inverted icon="plus" 
                        disabled={!item.onSale}
                        style={{ marginRight: 10 }}
                        onClick={() => onClickAction("Plus", item, quantity+1)}
                      />
                      <Header content={quantity} />
                      <Button size='mini' color="blue" inverted icon="minus"
                        style={{ marginLeft: 5 }}
                        disabled={!item.onSale}
                        style={{ marginLeft: 10 }}
                        onClick={() => onClickAction("Minus", item, quantity-1)}
                      />
                    </div>
                  </List.Content>
                </List.Item>
              )
          }
        })}
  </List></Segment>
}
const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, {
  getCategories,
  incrementToOrder,
  decrementFromOrder,
  getProducts
})(CategoriesMenu);
