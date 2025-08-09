import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CurrencyConverter({ trip }) {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);

    // Extract destination currency from trip data
    const destinationCurrency = trip?.tripData?.local_info?.currency || "EUR";

    useEffect(() => {
        setToCurrency(destinationCurrency);
    }, [destinationCurrency]);

    const popularCurrencies = [
        { code: "USD", name: "US Dollar", symbol: "$" },
        { code: "EUR", name: "Euro", symbol: "€" },
        { code: "GBP", name: "British Pound", symbol: "£" },
        { code: "JPY", name: "Japanese Yen", symbol: "¥" },
        { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
        { code: "AUD", name: "Australian Dollar", symbol: "A$" },
        { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
        { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
        { code: "INR", name: "Indian Rupee", symbol: "₹" },
        { code: "KRW", name: "South Korean Won", symbol: "₩" }
    ];

    const convertCurrency = async () => {
        if (!amount || fromCurrency === toCurrency) {
            setConvertedAmount(amount);
            setExchangeRate(1);
            return;
        }

        setLoading(true);
        try {
            // Using a free exchange rate API (you might want to use a more reliable one)
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );
            const data = await response.json();

            if (data.rates && data.rates[toCurrency]) {
                const rate = data.rates[toCurrency];
                const converted = (amount * rate).toFixed(2);
                setExchangeRate(rate);
                setConvertedAmount(converted);
            } else {
                throw new Error("Currency not found");
            }
        } catch (error) {
            console.error("Currency conversion error:", error);
            // Fallback to approximate rates for demo
            const approximateRates = {
                "USD-EUR": 0.85,
                "EUR-USD": 1.18,
                "USD-GBP": 0.73,
                "GBP-USD": 1.37,
                "USD-JPY": 110,
                "JPY-USD": 0.009
            };

            const rateKey = `${fromCurrency}-${toCurrency}`;
            const rate = approximateRates[rateKey] || 1;
            const converted = (amount * rate).toFixed(2);
            setExchangeRate(rate);
            setConvertedAmount(converted);
        } finally {
            setLoading(false);
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setExchangeRate(null);
        setConvertedAmount(null);
    };

    const getCurrencySymbol = (code) => {
        const currency = popularCurrencies.find(c => c.code === code);
        return currency?.symbol || code;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="font-bold text-xl text-[#364F6B] mb-6 flex items-center gap-2">
                💱 Currency Converter
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Currency */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">From</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3FC1C9] focus:border-transparent"
                    >
                        {popularCurrencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </select>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Enter amount"
                        className="text-lg font-semibold"
                    />
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center">
                    <Button
                        onClick={swapCurrencies}
                        variant="outline"
                        className="rounded-full p-3 hover:bg-[#3FC1C9] hover:text-white"
                    >
                        ⇄
                    </Button>
                </div>

                {/* To Currency */}
                <div className="space-y-3 md:col-start-2">
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3FC1C9] focus:border-transparent"
                    >
                        {popularCurrencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </select>
                    <div className="border rounded-lg p-3 bg-gray-50 text-lg font-semibold text-[#364F6B]">
                        {convertedAmount !== null ? (
                            `${getCurrencySymbol(toCurrency)} ${convertedAmount}`
                        ) : (
                            "Click convert"
                        )}
                    </div>
                </div>
            </div>

            {/* Convert Button */}
            <div className="text-center mt-6">
                <Button
                    onClick={convertCurrency}
                    disabled={loading}
                    className="bg-[#3FC1C9] hover:bg-[#FC5185] px-8 py-2"
                >
                    {loading ? "Converting..." : "Convert"}
                </Button>
            </div>

            {/* Exchange Rate Info */}
            {exchangeRate && (
                <div className="mt-4 text-center text-sm text-gray-600">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
            )}

            {/* Quick Conversion Table */}
            {exchangeRate && (
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-[#364F6B] mb-3">Quick Reference</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {[1, 5, 10, 20, 50, 100, 200, 500].map(value => (
                            <div key={value} className="flex justify-between bg-white rounded p-2">
                                <span>{getCurrencySymbol(fromCurrency)} {value}</span>
                                <span className="font-medium">
                                    {getCurrencySymbol(toCurrency)} {(value * exchangeRate).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <div className="mt-4 text-xs text-gray-500 text-center">
                Exchange rates are approximate and may vary. Check with your bank for exact rates.
            </div>
        </div>
    );
}

export default CurrencyConverter;