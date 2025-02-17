import { useEffect, useState } from "react";
import OrderService from "@/service/OrderService"; // Import your order service
import { useNavigate } from "react-router-dom";
import { IOrder} from "@/commons/interfaces.ts";
import AddressService from "@/service/AddressService.ts"; // Adjust the path if needed

interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
}

const CheckoutPage = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [pendingOrder, setPendingOrder] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

    // Shipping states
    const [shippingCost, setShippingCost] = useState<number | null>(null);
    const [shippingCostMessage, setShippingCostMessage] = useState<string | null>(
        null
    );

    const navigate = useNavigate();

    useEffect(() => {
        loadAddresses();
    }, []);

    // Recalculate shipping whenever the selected address changes
    useEffect(() => {
        calcShipping();
    }, [selectedAddress, addresses]);

    const calcShipping = async () => {
        // For testing, we’re using fixed shipping cost values.
        // (In your real implementation, you can uncomment your API call logic.)
        setShippingCostMessage("Fixo para teste");
        setShippingCost(19);
    };

    const loadAddresses = async () => {
        try {
            const response = await AddressService.findAll();
            if (response) {
                setAddresses(response);
            }
        } catch (error) {
            console.error("Erro ao carregar endereços:", error);
        }
    };

    const handleSelectAddress = (id: number | undefined) => {
        setSelectedAddress(id);
        // Log the selected address ID immediately (use the passed id, not the state)
        console.log("Selected address id:", id);
    };

    const handleFinishOrder = async () => {
        if (!selectedAddress || !paymentMethod) {
            alert("Please select an address and a payment method.");
            return;
        }

        const cartString = localStorage.getItem("cart");
        if (!cartString) {
            alert("No items in cart.");
            return;
        }

        const cartItems = JSON.parse(cartString);
        if (!cartItems.length) {
            alert("No items in cart.");
            return;
        }

        // Adjust orderItems to match your working JSON (using "productId" as key)
        const orderItems = cartItems.map((item: any) => ({
            productId: { id: item.id },
            quantity: item.quantity,
        }));

        // Build the order payload based on your working sample
        const order: IOrder = {
            // If your API requires a user field, you can add it here:
            shipping: 19,
            // Format payment method to uppercase with underscore if needed (e.g., "CREDIT_CARD")
            payment: paymentMethod.toUpperCase().replace(" ", "_"),
            addressId: selectedAddress ,
            itemsList: orderItems,
        };

        console.log("Order being sent:", JSON.stringify(order, null, 2));

        setPendingOrder(true);
        setOrderError(null);
        setOrderSuccess(null);

        try {
            const response = await OrderService.save(order);
            if (response.status === 200 || response.status === 201) {
                setOrderSuccess("Order placed successfully!");
                localStorage.removeItem("cart");
                navigate("/", { state: { order: response.data } });
            } else {
                setOrderError("Failed to place order. Please try again.");
            }
        } catch (error: any) {
            console.error("Order error", error);
            setOrderError("Failed to place order. Please try again.");
        } finally {
            setPendingOrder(false);
        }
    };

    return (
        <main className="container">
            <h1 className="fw-bold mb-4">Checkout</h1>

            {/* Addresses List */}
            <div className="mb-4">
                <h5>Select Delivery Address</h5>
                <div
                    style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        padding: "10px",
                    }}
                >
                    {addresses.length > 0 ? (
                        addresses.map((addr) => (
                            <div
                                key={addr.id}
                                onClick={() => handleSelectAddress(addr.id)}
                                style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginBottom: "5px",
                                    cursor: "pointer",
                                    background: selectedAddress === addr.id ? "#ddd" : "#fff",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <p>
                                    {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No saved addresses.</p>
                    )}
                </div>
                <button className="btn btn-outline-primary mt-2">
                    + Add New Address
                </button>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
                <h5>Select Payment Method</h5>
                <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="credit card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank transfer">Bank Transfer</option>
                </select>
            </div>

            {/* Display Calculated Shipping Cost */}
            {shippingCostMessage && (
                <div className="mb-4">
                    <h5>Shipping Cost</h5>
                    <p>{shippingCostMessage}</p>
                </div>
            )}

            {/* Finish Order Button */}
            <button
                className="btn btn-info btn-lg"
                onClick={handleFinishOrder}
                disabled={pendingOrder}
            >
                {pendingOrder ? "Placing Order..." : "Finish Order"}
            </button>

            {orderError && <div className="alert alert-danger mt-3">{orderError}</div>}
            {orderSuccess && (
                <div className="alert alert-success mt-3">{orderSuccess}</div>
            )}
        </main>
    );
};

export default CheckoutPage;