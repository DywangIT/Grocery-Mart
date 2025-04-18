// turn on dark theme
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#darktheme-btn");
    const html = document.documentElement;

    // Áp dụng lại theme nếu đã lưu
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        html.classList.add("dark");
    }

    if (!button) return;

    button.onclick = () => {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if(isDark) button.querySelector('span').innerText = 'Light mode'
        else button.querySelector('span').innerText = 'Dark mode'
    };
});

// Update price range
document.addEventListener("DOMContentLoaded", function () {
    const minSlider = document.getElementById("min-slider");
    const maxSlider = document.getElementById("max-slider");
    const minPrice = document.getElementById("min-price");
    const maxPrice = document.getElementById("max-price");

    if (minSlider && maxSlider && minPrice && maxPrice) {
        // Update
        const update = () => {
            minPrice.innerText = "$" + minSlider.value + ".00";
            maxPrice.innerText = "$" + maxSlider.value + ".00";
        };

        update();

        // Đảm bảo giá min không vượt quá giá max
        minSlider.addEventListener("input", function () {
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            update();
        });

        // Đảm bảo giá max không nhỏ hơn giá min
        maxSlider.addEventListener("input", function () {
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                minSlider.value = maxSlider.value;
            }
            update();
        });
    }
});

// Dropdown menu
document.addEventListener("DOMContentLoaded", function () {
    const navbarItems = Array.from(document.querySelectorAll(".navbar__item"));
    if (navbarItems) {
        let activeItem = null;
        navbarItems.forEach((item) => {
            item.onclick = (e) => {
                item.querySelector(".dropdown").onclick = (e) => {
                    e.stopPropagation();
                };
                if (item.classList.contains("active"))
                    item.classList.remove("active");
                else {
                    navbarItems.forEach((element) => {
                        element.classList.remove("active");
                    });
                    item.classList.add("active");
                    activeItem = item;
                }
            };
        });
        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
            if (activeItem && !activeItem.contains(e.target)) {
                activeItem.classList.remove("active");
                activeItem = null;
            }
        });
    }
});

// Toggle btn
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các button có class "toggle-btn"
    const toggleBtns = Array.from(document.querySelectorAll(".toggle-btn"));
    if (!toggleBtns.length) return;
    const targets = [];

    toggleBtns.forEach((toggleBtn) => {
        const dataId = toggleBtn.dataset.id;
        if (!dataId) {
            return console.error(
                `${toggleBtn.outerHTML} has no 'data-id' attribute!`
            );
        }

        // Tìm phần tử target dựa vào giá trị của data-id
        const targetElement = document.querySelector(dataId);
        if (!targetElement) {
            return console.error(`"${dataId}" does not exist!`);
        }

        // Lưu lại cặp toggleBtn và targetElement vào mảng targets để quản lý
        targets.push({ toggleBtn, targetElement });

        // Đảm bảo tất cả các target đều ẩn ban đầu
        targetElement.classList.remove("show");

        // Xử lý sự kiện click cho từng nút toggle
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // Ngăn click lan ra ngoài document
            const isShown = targetElement.classList.contains("show");

            // Đóng tất cả các target trước
            targets.forEach(({ toggleBtn: btn, targetElement: el }) => {
                el.classList.remove("show");
                btn.classList.remove("active");
            });

            // Nếu target hiện tại đang ẩn thì mở nó ra
            if (!isShown) {
                targetElement.classList.add("show");
                toggleBtn.classList.add("active");
            }
        });

        // Ngăn sự kiện click trong targetElement lan ra ngoài
        targetElement.addEventListener("click", (e) => e.stopPropagation());
    });

    // Đóng tất cả các target khi click ra ngoài (vào document)
    document.addEventListener("click", function () {
        targets.forEach(({ toggleBtn, targetElement }) => {
            targetElement.classList.remove("show");
            toggleBtn.classList.remove("active");
        });
    });
});

// Slider
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slideshow__inner");
    if (slider) {
        new Slidezi(".slideshow__inner", {
            loop: true,
            speed: 1000
        });
    }
});

// in product tabs
document.addEventListener("DOMContentLoaded", function () {
    const productTabs = document.querySelector(".product-tabs__list");
    if (!productTabs) return;
    new Tabzi("#product-tabs", {
        activeClassName: "product-tabs__item--active",
        remember: "true"
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".product-image-gallery__main");
    const thumbsList = Array.from(
        document.querySelectorAll(".image-gallery__thumbnail")
    );
    if (!gallery || !thumbsList.length) return;
    // Set default image
    thumbsList[0].classList.add("active");
    gallery.innerHTML = thumbsList[0].outerHTML;
    thumbsList.forEach((element) => {
        element.onclick = () => {
            gallery.innerHTML = element.outerHTML;
            thumbsList.forEach((element) => {
                element.classList.remove("active");
            });
            element.classList.add("active");
        };
    });
});

// notification message
document.addEventListener("DOMContentLoaded", function () {
    const successMessage = document.querySelector(".message--success");
    const errorMessage = document.querySelector(".message--error");
    const warningMessage = document.querySelector(".message--warning");
    if (!successMessage) return;
    const messages = Array.from(document.querySelectorAll(".message"));
    // Ẩn tất cả message
    messages.forEach((element) => {
        element.classList.remove("show");
    });

    const button = document.getElementById("cf-signup");
    // Hiển thị thông báo thành công khi click
    button.onclick = function (e) {
        successMessage.classList.add("show");
        setTimeout(() => {
            successMessage.classList.remove("show");
        }, 3000);
    };
});

// validate form
document.addEventListener("DOMContentLoaded", () => {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const cfPassword = document.querySelector("#confirm-password");
    const button = document.getElementById("cf-signup");
    if (!button) return;
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");
    const cfPasswordError = document.querySelector("#cfPasswordError");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let validatedEmail = false;
    let validatedPassword = false;
    let validatedCfPassword = false;

    function checkEmail() {
        if (!emailRegex.test(email.value.trim())) {
            emailError.classList.add("show");
            email.closest(".user-input").style.borderColor =
                "rgb(232, 107, 107)";
            validatedEmail = false;
            lightingButton();
        } else {
            emailError.classList.remove("show");
            email.closest(".user-input").style.borderColor = "initial";
            validatedEmail = true;
            lightingButton();
        }
    }

    function checkPassword() {
        if (!passwordRegex.test(password.value)) {
            passwordError.classList.add("show");
            password.closest(".user-input").style.borderColor =
                "rgb(232, 107, 107)";
            validatedPassword = false;
            lightingButton();
            if (cfPassword) checkCfPassword();
        } else {
            passwordError.classList.remove("show");
            password.closest(".user-input").style.borderColor = "initial";
            validatedPassword = true;
            lightingButton();
            if (cfPassword) checkCfPassword();
        }
    }

    function checkCfPassword() {
        if (cfPassword.value !== password.value) {
            cfPasswordError.classList.add("show");
            cfPassword.closest(".user-input").style.borderColor =
                "rgb(232, 107, 107)";
            validatedCfPassword = false;
            lightingButton();
        } else {
            cfPasswordError.classList.remove("show");
            cfPassword.closest(".user-input").style.borderColor = "initial";
            validatedCfPassword = true;
            lightingButton();
        }
    }
    lightingButton();
    if (email) email.addEventListener("input", checkEmail);
    if (password) password.addEventListener("input", checkPassword);
    if (cfPassword) cfPassword.addEventListener("input", checkCfPassword);

    function lightingButton() {
        if (
            (email ? validatedEmail : true) &&
            (password ? validatedPassword : true) &&
            (cfPassword ? validatedCfPassword : true)
        ) {
            button.removeAttribute("disabled");
            button.style.opacity = "1";
        } else {
            button.setAttribute("disabled", "true");
            button.style.opacity = "0.6";
        }
    }

    button.onclick = (e) => {
        if (email && password) {
            setTimeout(() => window.location.replace("home.html"), 1000);
        }
    };
});

// increase/decrease quantity
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả nhóm điều khiển số lượng trong checkout
    const quantityGroups = document.querySelectorAll(
        ".checkout__product-quantity"
    );
    if (!quantityGroups.length) return;

    quantityGroups.forEach((group) => {
        const minusBtnsBtn = group.querySelectorAll(
            ".checkout__quantity-btn"
        )[0];
        const plusBtn = group.querySelectorAll(".checkout__quantity-btn")[1];
        const input = group.querySelector(".checkout__quantity-input");

        // Xử lý giảm số lượng
        minusBtnsBtn.addEventListener("click", () => {
            let current = parseInt(input.value) || 1;
            if (current > 1) {
                input.value = current - 1;
            }
        });

        // Xử lý tăng số lượng
        plusBtn.addEventListener("click", () => {
            let current = parseInt(input.value) || 1;
            input.value = current + 1;
        });

        // Giới hạn người dùng nhập không hợp lệ
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "");
            if (input.value === "" || parseInt(input.value) < 1) {
                input.value = 1;
            }
        });
    });
});

// open modal when click delete button
document.addEventListener("DOMContentLoaded", function () {
    if (typeof Mozi === "undefined") return;
    const deleteCfModal = new Mozi({
        content: "<p>Are you sure delete this?</p>",
        // templateId: 'my-modal-template',
        footer: true,
        destroyOnClose: true,
        closeMethods: ["overlay", "button", "escape"],
        cssClass: ["deleteCfModal", "custom-class-2"]
    });

    deleteCfModal.addFooterButton("Cancel", "cancelBtn", function () {
        deleteCfModal.close();
    });

    deleteCfModal.addFooterButton("Confirm", "confirmBtn", function () {
        deleteCfModal.close();
    });
    const openModalBtns = Array.from(
        document.querySelectorAll(".checkout__product-delete")
    );
    if (!openModalBtns.length) return;
    openModalBtns.forEach((openModalBtn) => {
        openModalBtn.addEventListener("click", function () {
            deleteCfModal.open();
        });
    });
});

// change slider btn
document.addEventListener("DOMContentLoaded", function () {
    const nextBtn = document.querySelector(".slidezi-next");
    const prevBtn = document.querySelector(".slidezi-prev");

    if (!nextBtn || !prevBtn) return;

    // Gộp 2 nút lại để thao tác chung
    const buttons = [nextBtn, prevBtn];

    // Gán icon và style mặc định
    buttons.forEach((btn) => {
        btn.innerHTML = `<img src="./assets/icons/arrow-right.svg" alt="">`;
        Object.assign(btn.style, {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        });
    });

    // Quay ngược mũi tên của prevBtn
    prevBtn.querySelector("img").style.rotate = "180deg";

    // Hàm xử lý khi resize
    function handleResize() {
        const isMd = window.innerWidth < 992;
        buttons.forEach((btn) => {
            if (isMd) {
                btn.style.width = "42px";
                btn.style.height = "42px";
            } else {
                btn.style.width = "";
                btn.style.height = "";
            }
        });
    }

    // Gọi khi load trang
    handleResize();

    // Gán 1 lần sự kiện resize
    window.addEventListener("resize", handleResize);
});

// filtering input icon
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".user-input input");
    if (!inputs) return;
    inputs.forEach((input) => {
        const icon = input.closest(".user-input").querySelector("img");

        const updateIconFilter = () => {
            if (input.value.trim() !== "") {
                icon.style.filter = `var(--form-icon-filter)`;
            } else {
                icon.style.filter = "none";
            }
        };

        // Kiểm tra khi load và khi người dùng nhập
        updateIconFilter();
        input.addEventListener("input", updateIconFilter);
    });
});

// change img src
document.addEventListener("DOMContentLoaded", function () {
    const heartImages = document.querySelectorAll("#heart");
    if (!heartImages.length) return;
    heartImages.forEach((img) => {
        img.addEventListener("click", function () {
            const currentSrc = img.getAttribute("src");

            if (currentSrc.includes("./assets/icons/heart.svg")) {
                img.setAttribute("src", "./assets/icons/redheart.svg");
                img.classList.remove("icon");
                img.style.filter = "none";
            } else {
                img.setAttribute("src", "./assets/icons/heart.svg");
            }
        });
    });
});
