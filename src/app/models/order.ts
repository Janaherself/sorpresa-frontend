export interface Order{
    items: OrderItem[];
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerAddress: string;
    paymentMethod: string;
}

export interface OrderItem {
    productID: number;
    quantity: number;
}