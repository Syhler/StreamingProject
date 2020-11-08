<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md" style=" height: 100vh">
      <div class="mb-3">
        <base-button type="success">Add Torrent</base-button>
      </div>

      <div>
        <table class="table text-white">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Storage</th>
            <th scope="col">Progress</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Avenger</td>
            <td>8.5 GB</td>
            <td>
              <div class="progress text-center" style="height: 1vh;">
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">25%
                </div>
              </div>
            </td>
            <td>
              <base-button type="danger" size="sm">Delete</base-button>
            </td>
          </tr>
          <tr>
            <td>Avenger 2.0</td>
            <td>8.5 GB</td>
            <td>
              <div class="progress" style="height: 1vh">
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">25%
                </div>
              </div>
            </td>
            <td>
              <base-button type="danger" size="sm">Delete</base-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {

  name: "ViewTorrents"
}
</script>

<style scoped>

</style>