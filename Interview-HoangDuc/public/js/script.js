$(document).ready(function() {

    var current_fs, next_fs, previous_fs;
    var opacity;
    var current = 1;
    var steps = $('fieldset').length;

    setProgressBar(current);
    function getMeal() {
        $.ajax({
            url: 'http://restaurant.test/api/meal-categories',
            type: "GET",
            success: function(response) {
                let select = document.getElementById('meal-categories');

                response.forEach(item => {
                    select.innerHTML += `<option value='${item.id}'>${item.name}</option>`;
                });
                $('#meal-categories').change(function() {
                    let mealCategoryId = $(this).val();
                });
            },

            error: function(error) {
                console.log(error);
            }
        });
    }
    function getRestaurant() {
        $.ajax({
            url: 'http://restaurant.test/api/restaurants',
            type: "GET",
            success: function(response) {
                let select = document.getElementById('restaurant');

                response.forEach(item => {
                    select.innerHTML += `<option value='${item.id}'>${item.name}</option>`;
                });
            },

            error: function(error) {
                console.log(error);
            }
        });
    }

    getMeal();
    getRestaurant();
    $('.next').click(function() {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();


        if (validateStep1(current_fs) === true) {
            $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
            next_fs.show();
            current_fs.animate({ opacity: 0 }, {
                step: function(now) {
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative',
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 500,
            });
            setProgressBar(++current);
        } else if (validateStep2(current_fs) === true) {
            $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
            next_fs.show();
            current_fs.animate({ opacity: 0 }, {
                step: function(now) {
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative',
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 500,
            });
            setProgressBar(++current);
        } else if (validateStep3(current_fs) === true) {
            $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
            next_fs.show();
            current_fs.animate({ opacity: 0 }, {
                step: function(now) {
                    opacity = 1 - now;
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative',
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 500,
            });
            setProgressBar(++current);
        }
    });
    function validateStep1(fieldset) {
        let isValid = true;
        let mealCategory = $('#meal-categories').val();
        let numberOfPeople = fieldset.find('input[name="numberOfPeople"]').val();

        if (!mealCategory) {
            fieldset.find('#meal-error').text('Please select a meal.');
            isValid = false;
        } else {
            $.ajax({
                url: 'http://restaurant.test/api/meal-categories',
                type: "GET",
                success: function(response) {
                    response.forEach(item => {
                        if (mealCategory == item.id) {
                            document.querySelector('.meal-pre').innerHTML = item.name;
                        }
                    });
                },

                error: function(error) {
                    console.log(error);
                }
            });
            fieldset.find('#meal-error').text('');
        }

        if (!numberOfPeople || numberOfPeople < 1 || numberOfPeople > 10) {
            fieldset.find('#numberOfPeople-error').text('Please enter a valid number of people (1-10).');
            isValid = false;
        } else {
            document.querySelector('.no-of-people-pre').innerHTML = numberOfPeople;
            fieldset.find('#numberOfPeople-error').text('');
        }

        return isValid;
    }

    function validateStep2(fieldset) {
        let isValid = true;
        let restaurant = $('#restaurant').val();
        if (!restaurant) {
            fieldset.find('#restaurant-error').text('Please select a restaurant.');
            isValid = false;
        } else {
            $.ajax({
                url: 'http://restaurant.test/api/restaurants',
                type: "GET",
                success: function(response) {
                    response.forEach(item => {
                        if (restaurant == item.id) {
                            document.querySelector('.restaurant-pre').innerHTML = item.name;
                        }
                    });
                },

                error: function(error) {
                    console.log(error);
                }
            });
            fieldset.find('#restaurant-error').text('');
        }
        return isValid;
    }

    function validateStep3(fieldset) {
        let isValid = true;
        let dishes = $('#dishes').val();
        let numberOfDishes = fieldset.find('input[name="numberOfDishes"]').val();

        fieldset.find('#dishes-error').text('Please select a dishes.');
        isValid = false;
        if (!dishes) {

        } else {
            fieldset.find('#dishes-error').text('');
        }

        if (!numberOfDishes || numberOfDishes < 1 || numberOfDishes > 10) {
            fieldset.find('#numberOfDishes-error').text('Please enter a valid number of dishes (1-10).');
            isValid = false;
        } else {
            fieldset.find('#numberOfDishes-error').text('');
        }
        return isValid;
    }

    $('.previous').click(function() {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

        previous_fs.show();

        current_fs.animate({ opacity: 0 }, {
            step: function(now) {
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative',
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 500,
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $('.progress-bar')
            .css('width', percent + '%');
    }



    let count = 0;
    let selectedDishes = [];

    document.querySelector('.button_add').addEventListener('click', function () {
        const thisClone = document.querySelector(`#content-clone-${count}`);
        let dish = thisClone.querySelector('.dishes');
        let numberOfDishes = thisClone.querySelector('.numberOfDishes');

        if (dish.value != '' || numberOfDishes.value != '') {
            let newDish = {
                id: dish.value,
                quantity: numberOfDishes.value
            };

            selectedDishes.push(newDish);
        }

        const div = document.querySelector(`#content-clone-${count}`);
        count++;
        const clone = div.cloneNode(true);
        clone.id = `content-clone-${count}`;
        clone.querySelector('.numberOfDishes').value = 0;
        document.querySelector('#main_content').appendChild(clone);
    });

    document.querySelector('.step3').addEventListener('click', function () {
        const thisClone = document.querySelector(`#content-clone-${count}`);
        let dish = thisClone.querySelector('.dishes');
        let numberOfDishes = thisClone.querySelector('.numberOfDishes');

        if (dish.value != '' || numberOfDishes.value != '') {
            let newDish = {
                id: dish.value,
                quantity: numberOfDishes.value
            };

            selectedDishes.push(newDish);
        }
        let arrayDishes = [];
        $.ajax({
            url: 'http://restaurant.test/api/dishes',
            type: "GET",
            success: function(response) {
                arrayDishes.push(response)
            },

            error: function(error) {
                console.log(error);
            }
        });
        console.log(arrayDishes);
        arrayDishes.forEach((subArray) => {
            console.log(subArray)
            subArray.forEach((item) => {
                console.log(item.id);
            });
        });

        selectedDishes.forEach((element) => {
            console.log(element.id);
            arrayDishes.forEach((subArray) => {
                subArray.forEach((item) => {
                    if (element.id === item.id) {
                        console.log(item.name)
                    }
                })
            })
        });
    });
    document.querySelector('.step4-previous').addEventListener('click', function() {
        selectedDishes.pop();
    })
    function getDish() {
        $.ajax({
            url: 'http://restaurant.test/api/dishes',
            type: "GET",
            success: function(response) {
                let select = document.querySelector('.dishes');

                response.forEach(item => {
                    select.innerHTML += `<option value='${item.id}'>${item.name}</option>`;
                });
            },

            error: function(error) {
                console.log(error);
            }
        });
    }
    getDish();

    $('.submit').click(function() {

        let numberOfPeople = $('input[name="numberOfPeople"]').val();
        let mealCategoryId = $('#meal-categories').val();
        let restaurantId = $('#restaurant').val();

        let dishes = selectedDishes.map(dish => {
            return {
                id: dish.id,
                quantity: dish.quantity
            };
        });

        let formData = {
            meal_category_id: mealCategoryId,
            restaurant_id: restaurantId,
            number_of_people: numberOfPeople,
            dishes: dishes
        };

        $.ajax({
            url: 'http://restaurant.test/api/orders',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

});
