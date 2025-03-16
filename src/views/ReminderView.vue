<template>
  <div class="reminder-container">
    <h1>Sunscreen Reminder</h1>

    <div class="image-container">
      <img src="/images/reminder.jpg" alt="Reminder" />
    </div>

    <br />
    <h3>Get reminded to put on sunscreen!</h3>

    <div class="reminder-card">
      <!-- Reminder Interval -->
      <div class="reminder-option">
        <label for="reminder-interval">Reminder Interval:</label>
        <select v-model="selectedInterval" @change="updateReminder">
          <option value="10800">Every 3 hours</option>
          <option value="7200">Every 2 hours</option>
          <option value="3600">Every 1 hour</option>
          <option value="custom">Custom</option>
        </select>
        <input
          v-if="selectedInterval === 'custom'"
          type="number"
          v-model="customInterval"
          placeholder="Enter interval (seconds)"
          @input="updateReminder"
        />
      </div>

      <!-- Sunscreen Type -->
      <div class="reminder-option">
        <label for="sunscreen-type">Sunscreen Type:</label>
        <select v-model="sunscreenType">
          <option value="water-resistant">Water-Resistant</option>
          <option value="non-water-resistant">Non-Water-Resistant</option>
        </select>
      </div>

      <!-- SPF Level -->
      <div class="reminder-option">
        <label for="spf-level">SPF Level:</label>
        <input type="number" v-model="spfLevel" placeholder="Enter SPF (e.g., 30, 50)" />
      </div>

      <!-- Enable Reminder Toggle -->
      <div class="reminder-option">
        <label>Enable Reminder:</label>
        <label class="toggle-switch">
          <input type="checkbox" v-model="reminderActive" @change="toggleReminder" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <!-- Countdown Popup -->
    <div v-if="showCountdownPopup" class="countdown-popup">
      <div class="popup-content">
        <!-- <h3>Reminder Active</h3> -->
        <p>Reapply sunscreen in: <strong>{{ formattedCountdown }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const reminderActive = ref(false);
    const showCountdownPopup = ref(false);
    const countdown = ref(3 * 3600);
    const selectedInterval = ref('10800');
    const customInterval = ref('');
    let timer = null;

    const formattedCountdown = computed(() => {
      const hours = Math.floor(countdown.value / 3600);
      const minutes = Math.floor((countdown.value % 3600) / 60);
      const seconds = countdown.value % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });

    const updateReminder = () => {
      if (selectedInterval.value === 'custom' && (!customInterval.value || customInterval.value <= 0)) {
        alert('Please enter a valid custom interval.');
        return;
      }
    };

    const toggleReminder = () => {
      if (reminderActive.value) {
        startReminder();
      } else {
        clearInterval(timer);
        showCountdownPopup.value = false;
        countdown.value = 0;
      }
    };

    const startReminder = () => {
      let interval =
        selectedInterval.value === 'custom' ? parseInt(customInterval.value) : parseInt(selectedInterval.value);

      if (isNaN(interval) || interval <= 0) {
        alert('Invalid interval.');
        reminderActive.value = false;
        return;
      }

      countdown.value = interval;
      showCountdownPopup.value = true;

      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          showCountdownPopup.value = false;
          reminderActive.value = false;
          alert('Time to reapply your sunscreen!');
        }
      }, 1000);
    };

    return {
      reminderActive,
      showCountdownPopup,
      countdown,
      formattedCountdown,
      toggleReminder,
      selectedInterval,
      customInterval,
      updateReminder,
    };
  },
};
</script>

<style scoped>
/* Reminder Styles */
.reminder-container {
  text-align: center;
  margin-top: 40px;
}

.reminder-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.reminder-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.reminder-option label {
  font-weight: bold;
}

.reminder-option select,
.reminder-option input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Countdown Popup */
.countdown-popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
