$(document).ready(function() {

    var current_fs, next_fs, previous_fs;
    var opacity;
    var current = 1;
    var steps = $('fieldset').length;

    setProgressBar(current);

    $('#meal-categories').change(function() {
        let mealCategoryId = $(this).val();
        getRestaurant(mealCategoryId);
    });


    $('#restaurant').change(function() {
        let restaurantId = $(this).val();
        getDish(restaurantId);
    });

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
    function getRestaurant(mealCategoryId) {
        $.ajax({
            url: 'http://restaurant.test/api/restaurants?meal_category_id=' + mealCategoryId,
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
                url: 'http://restaurant.test/api/restaurants?meal_category_id=' + $('#meal-categories').val(),
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
    let countDish = 0
    document.querySelector('.button_add').addEventListener('click', function () {
        const thisClone = document.querySelector(`#content-clone-${count}`);
        let dish = thisClone.querySelector('.dishes');
        let numberOfDishes = thisClone.querySelector('.numberOfDishes');
        $.ajax({
            url: 'http://restaurant.test/api/dishes?restaurant_id=' + $('#restaurant').val(),
            type: "GET",
            success: function(response) {
                let nameDishes = '';
                response.forEach(item => {
                    if (item.id == dish.value) {
                        nameDishes = item.name;
                    }
                });

                let newDishPrev = {
                    name: nameDishes,
                    quantity: numberOfDishes.value
                };
                countDish ++
                if(countDish >= prevOfDishes.length){
                    prevOfDishes.push(newDishPrev);

                }
                const dishesPrev = document.querySelector('.dishes-pre');
                prevOfDishes.forEach(item => {
                    dishesPrev.innerHTML += `<p>${item.name} - ${item.quantity}</p>`;
                });
                prevOfDishes.pop();
            },

            error: function(error) {
                console.log(error);
            }
        });
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

    let prevOfDishes = [];

    document.querySelector('.step4-previous').addEventListener('click', function() {
        const dishesPrev = document.querySelector('.dishes-pre');
        dishesPrev.innerHTML = '';
        //prevOfDishes.splice(0, prevOfDishes.length);
    });

    document.querySelector('.step3').addEventListener('click', function () {
        const thisClone = document.querySelector(`#content-clone-${count}`);
        let dish = thisClone.querySelector('.dishes');
        let numberOfDishes = thisClone.querySelector('.numberOfDishes');
        $.ajax({
            url: 'http://restaurant.test/api/dishes?restaurant_id=' + $('#restaurant').val(),
            type: "GET",
            success: function(response) {
                let nameDishes = '';
                response.forEach(item => {
                    if (item.id == dish.value) {
                        nameDishes = item.name;
                    }
                });

                let newDishPrev = {
                    name: nameDishes,
                    quantity: numberOfDishes.value
                };
                if(countDish >= prevOfDishes.length) {
                    prevOfDishes.push(newDishPrev);
                }
                const dishesPrev = document.querySelector('.dishes-pre');
                if (prevOfDishes.length > 0) {
                    prevOfDishes.forEach(item => {
                        dishesPrev.innerHTML += `<p>${item.name} - ${item.quantity}</p>`;
                    });
                }
            },

            error: function(error) {
                console.log(error);
            }
        });

        let newDish = {
            id: dish.value,
            quantity: numberOfDishes.value
        };

        selectedDishes.push(newDish);
    });

    function getDish(restaurantId) {
        $.ajax({
            url: 'http://restaurant.test/api/dishes?restaurant_id=' + restaurantId,
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
