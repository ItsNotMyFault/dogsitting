<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template #eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div class="demo-app-sidebar">
      <div class="row-0">
        <h2>SELECTOR CURRENT ASSEMBLY</h2>
      </div>
      <div class="row-1">
        <div class="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div class="demo-app-sidebar-section">
          <label>
            <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle">
            toggle weekends
          </label>
          <br>
          <label>
            <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle">
            My disponibilities
          </label>
          <label>
            <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle">
            Current Assembly events
          </label>
          <label>
            <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle">
            Show other Assembly member dispos
          </label>
        </div>
      </div>
      <div class="row-2">
        <h1>SELECTED EVENT BE HERE</h1>
      </div>
      <!-- <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
// import '@fullcalendar/core/vdom' // solves problem with Vite
// import FullCalendar from "@/fullcalendar/vue";
// import dayGridPlugin from "@/fullcalendar/daygrid";
// import timeGridPlugin from "@/fullcalendar/timegrid";
// import interactionPlugin from "@/fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default {
  name: 'ReserveCalendar',

  components: {
    // FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      calendarOptions: {
        // height: 850,
        contentHeight: 900,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },

  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },

    handleEventClick(clickInfo) {
      console.log("eventClick", clickInfo.event);
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  width: 100%;
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
  padding-right: 100px;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
  width: 850px;
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
