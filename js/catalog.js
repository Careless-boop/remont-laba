const { createApp, onMounted, ref, computed } = Vue;

const appConfig = {
  setup() {
    const catalog = ref([
      {
        id: 1,
        name: "Overhaul",
        price: 10000
      },
      {
        id: 2,
        name: "Modernization of kitchens",
        price: 3000
      },
      {
        id: 3,
        name: "Bathroom renovation",
        price: 2500
      },
      {
        id: 4,
        name: "Home design",
        price: 1200
      },
      {
        id: 5,
        name: "Planking",
        price: 4000
      },
    ]);

    const selectedServices = ref([]);

    const isModalOpen = ref(false);

    const totalPrice = computed(() => {
      return selectedServices.value.reduce(
        (total, service) => total + service.price,
        0
      );
    });

    const addToCart = (service) => {
      if (selectedServices.value.some((item) => item.name === service.name)) {
        alert("You have already choosed this service!");
      } else {
        selectedServices.value.push(service);
        localStorage.setItem(
          "selectedServices",
          JSON.stringify(selectedServices.value)
        );
      }
    };

    const removeFromCart = (index) => {
      selectedServices.value.splice(index, 1);
      localStorage.setItem(
        "selectedServices",
        JSON.stringify(selectedServices.value)
      );
    };

    const selectedServicesDetails = computed(() => {
      return selectedServices.value;
    });

    const selectedServicesCount = computed(() => {
      return selectedServices.value.length;
    });

    onMounted(() => {
      console.log("Vue is mounted");
      const storedServices = localStorage.getItem("selectedServices");
      if (storedServices) {
        selectedServices.value = JSON.parse(storedServices);
      }
    });

    return {
      catalog,
      selectedServicesDetails,
      selectedServicesCount,
      totalPrice,
      isModalOpen,
      addToCart,
      removeFromCart,
    };
  },
};

createApp(appConfig).mount("#catalog");
